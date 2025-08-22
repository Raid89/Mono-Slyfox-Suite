import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '@slyfox-platform/prisma'; // ajusta si tu path cambia
import { LoginDto } from '../dto/login.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credenciales invalidas');
    }

    if (!user.isEmailVerified) {
      throw new ForbiddenException('Por favor verifica tu correo');
    }

    if (!user.is_active) {
      throw new ForbiddenException('Usuario inactivo');
    }

    if (!(await bcrypt.compare(dto.password, user.password_hash))) {
      throw new ForbiddenException('Credenciales invalidas');
    }

    const jti = randomUUID();

    const tokens = await this.generateTokens(user.id, user.email, jti);
    await this.storeRefreshToken(user.id, tokens.refreshToken, jti);

    const authData = { ...tokens, userId: user.id, email: user.email };

    return authData;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Acceso denegado');
    }

    const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!rtMatches) {
      throw new ForbiddenException('Token de actualización inválido');
    }

    const decoded = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    if (decoded.jti !== user.currentJti) {
      throw new ForbiddenException('Token ya fue rotado o no es válido');
    }

    const newJti = randomUUID();

    const tokens = await this.generateTokens(user.id, user.email, newJti);
    await this.storeRefreshToken(user.id, tokens.refreshToken, newJti);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.users.update({
      where: { id: userId },
      data: { hashedRt: null },
    });
    return { message: 'Sesión cerrada exitosamente' };
  }

  private async generateTokens(userId: number, email: string, jti: string) {
    const payload = { id: userId, email, jti };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: number, refreshToken: string, jti: string) {
    console.log(refreshToken)
    const hashedRt = await bcrypt.hash(refreshToken, 10);
    await this.prisma.users.update({
      where: { id: userId },
      data: { hashedRt, currentJti: jti },
    });
  }

  async getCurrentUserInformation(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        company_id: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      companyId: user.company_id,
      roles: user.roles.name
    };
  }
}
