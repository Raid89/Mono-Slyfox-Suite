import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../services/permissions.service';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const permissionId = this.reflector.get<number>(PERMISSION_KEY, context.getHandler());
    if (!permissionId) {
      return true; // No se requiere permiso
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Header de autorización no encontrado o formato incorrecto');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { id: number };
      const userId = decoded.id;

      const hasPermission = await this.permissionsService.hasPermission(userId, permissionId);
      if (!hasPermission) {
        throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
      }

      return true;
    } catch(error) {
      console.error('Error verifying token or checking permissions:', error);
      throw new UnauthorizedException(error.message || 'Token inválido o expirado');
    }
  }
}
