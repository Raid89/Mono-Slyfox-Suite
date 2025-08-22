import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { RolesModule } from '../modules/roles/roles/roles.module';
import { PermissionsModule } from '../modules/roles/permissions/permissions.module';
import { RolePermissionsModule } from '../modules/roles/role-permissions/role-permissions.module';

export function setupSwagger(app: INestApplication): void {
  // Configuración para la sección de Autenticación
  const authConfig = new DocumentBuilder()
    .setTitle('Autenticación')
    .setDescription('Endpoints relacionados con la autenticación')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const authDocument = SwaggerModule.createDocument(app, authConfig, {
    include: [AuthModule], // Incluye solo el módulo de autenticación
  });
  SwaggerModule.setup('docs/auth', app, authDocument);

  // Configuración para la sección de Roles
  const rolesConfig = new DocumentBuilder()
    .setTitle('Roles')
    .setDescription('Endpoints relacionados con la gestión de roles')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const rolesDocument = SwaggerModule.createDocument(app, rolesConfig, {
    include: [RolesModule, PermissionsModule, RolePermissionsModule], // Incluye solo el módulo de roles
  });
  SwaggerModule.setup('docs/roles', app, rolesDocument);

  // Configuración para la sección de Usuarios
  const usersConfig = new DocumentBuilder()
    .setTitle('Usuarios')
    .setDescription('Endpoints relacionados con la gestión de usuarios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const usersDocument = SwaggerModule.createDocument(app, usersConfig, {
    include: [UsersModule], // Incluye solo el módulo de usuarios
  });
  SwaggerModule.setup('docs/users', app, usersDocument);
}
