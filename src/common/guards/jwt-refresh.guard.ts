import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de refresco no encontrado o formato incorrecto');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      request.user = payload; // Adjunta el payload al objeto request
      console.log(`Payload del token de refresco: ${JSON.stringify(payload)}`);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de refresco inválido o expirado');
    }
  }
}
