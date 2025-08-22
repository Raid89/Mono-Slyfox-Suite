import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ headers: { authorization?: string } }>();
    const authHeader = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de acceso no encontrado o formato incorrecto');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { id: number };
      return payload.id; // Retorna el ID del usuario extraído del token
    } catch {
      throw new UnauthorizedException('Token de acceso inválido o expirado');
    }
  },
);
