import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma'; // Ajústalo a tu alias real
import { HttpService } from '@nestjs/axios';
import { EmailService } from '@libs/email/email.service';
import { AppLogger } from '@slyfox-platform/logger';
import { RegisterCompanyAndUserDto } from '../dto/register-company-user.dto';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { RolesService } from '../../roles/roles/services/roles.service';
import { ApiBody } from '@nestjs/swagger';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly logger: AppLogger,
    private readonly rolesService: RolesService, // Inyectar RolesService
  ) {}

  // REGISTRO Y ENVIO DE CORREO ELECTRONICO

  async register(dto: RegisterCompanyAndUserDto) {
    this.logger.log(
      `Intentando registrar empresa ${dto.company.name}`,
      'AuthService',
    );

    // Validar empresa existente por NIT o email
    const existingCompany = await this.prisma.companies.findFirst({
      where: {
        OR: [{ nit: dto.company.nit }, { email: dto.company.email }],
      },
    });

    if (existingCompany) {
      this.logger.warn(
        `Empresa ya existe: ${dto.company.nit} o ${dto.company.email}`,
        'AuthService',
      );
      throw new ConflictException(
        'Ya existe una empresa registrada con ese NIT o correo',
      );
    }

    // Validar usuario existente por email
    const existingUser = await this.prisma.users.findUnique({
      where: { email: dto.company.email },
    });

    if (existingUser) {
      this.logger.warn(`Usuario ya existe: ${dto.user.email}`, 'AuthService');
      throw new ConflictException('Ese correo ya está registrado como usuario');
    }

    try {
      // Crear empresa
      const company = await this.prisma.companies.create({
        data: {
          name: dto.company.name,
          nit: dto.company.nit,
          address: dto.company.address,
          phone: dto.company.phone,
          email: dto.company.email,
          isActive: false,
        },
      });

      this.logger.log(`Empresa creada: ID ${company.id}`, 'AuthService');

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(dto.user.password, 10);
      const verificationToken = randomUUID();

      const role = await this.createOwnerRole(company.id);

      // Crear usuario administrador
      const user = await this.prisma.users.create({
        data: {
          name: dto.user.fullName,
          document: dto.user.document,
          email: dto.user.email,
          password_hash: hashedPassword,
          company_id: company.id,
          isEmailVerified: false,
          email_verification_token: verificationToken,
          role_id: role.id,
        },
      });

      this.logger.log(`Usuario creado: ID ${user.id}`, 'AuthService');

      // Enviar correo
      try {
        await this.emailService.sendConfirmation(
          dto.user.email,
          verificationToken,
        );
        this.logger.log(
          `Correo de verificación enviado a ${dto.user.email}`,
          'AuthService',
        );
      } catch (error) {
        this.logger.error(
          `Fallo al enviar correo a ${dto.user.email}`,
          error.message,
          'AuthService',
        );

        // Opcional: podrías revertir la creación (soft rollback)
        await this.prisma.users.delete({ where: { email: dto.user.email } });
        await this.prisma.companies.delete({ where: { id: company.id } });

        throw new BadRequestException(
          'No se pudo enviar el correo de verificación. Intenta más tarde.',
        );
      }

      return {
        message: 'Registro exitoso. Verifica tu correo para activar la cuenta.',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(errorMessage, 'RegisterService');
      throw new BadRequestException(errorMessage);
    }
  }

  async confirm(token: string): Promise<boolean> {
    this.logger.log(`Confirmando token: ${token}`, 'AuthService');

    const user = await this.prisma.users.findFirst({
      where: { email_verification_token: token },
      include: { companies: true },
    });

    if (!user) {
      this.logger.warn(`Token inválido: ${token}`, 'AuthService');
      return false;
    }

    // Actualizar usuario
    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        email_verification_token: null,
      },
    });

    // Activar empresa
    await this.prisma.companies.update({
      where: { id: user.company_id || 1 },
      data: { isActive: true },
    });

    this.logger.log(
      `Usuario y empresa activados: ${user.email}`,
      'AuthService',
    );

    return true;
  }

  async getMe(user: { email: string }) {
    this.logger.log(
      `Obteniendo perfil del usuario: ${user.email}`,
      'RegisterService',
    );

    // Simular una operación asíncrona para cumplir con el método async
    await Promise.resolve();

    return { email: user.email }; // Retornar un objeto tipado en lugar de `any`
  }

  private async createOwnerRole(companyId: number) {
    const role = await this.rolesService.create({
      name: 'owner',
      company_id: companyId,
      permissionIds: [1],
    });

    this.logger.log(
      `Rol de propietario creado para la empresa ID ${companyId}`,
      'AuthService',
    );

    return role;
  }
}
