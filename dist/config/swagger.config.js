"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const auth_module_1 = require("../modules/auth/auth.module");
const users_module_1 = require("../modules/users/users.module");
const roles_module_1 = require("../modules/roles/roles/roles.module");
const permissions_module_1 = require("../modules/roles/permissions/permissions.module");
const role_permissions_module_1 = require("../modules/roles/role-permissions/role-permissions.module");
function setupSwagger(app) {
    const authConfig = new swagger_1.DocumentBuilder()
        .setTitle('Autenticación')
        .setDescription('Endpoints relacionados con la autenticación')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const authDocument = swagger_1.SwaggerModule.createDocument(app, authConfig, {
        include: [auth_module_1.AuthModule],
    });
    swagger_1.SwaggerModule.setup('docs/auth', app, authDocument);
    const rolesConfig = new swagger_1.DocumentBuilder()
        .setTitle('Roles')
        .setDescription('Endpoints relacionados con la gestión de roles')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const rolesDocument = swagger_1.SwaggerModule.createDocument(app, rolesConfig, {
        include: [roles_module_1.RolesModule, permissions_module_1.PermissionsModule, role_permissions_module_1.RolePermissionsModule],
    });
    swagger_1.SwaggerModule.setup('docs/roles', app, rolesDocument);
    const usersConfig = new swagger_1.DocumentBuilder()
        .setTitle('Usuarios')
        .setDescription('Endpoints relacionados con la gestión de usuarios')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const usersDocument = swagger_1.SwaggerModule.createDocument(app, usersConfig, {
        include: [users_module_1.UsersModule],
    });
    swagger_1.SwaggerModule.setup('docs/users', app, usersDocument);
}
//# sourceMappingURL=swagger.config.js.map