"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_controller_1 = require("./controllers/roles.controller");
const roles_service_1 = require("./services/roles.service");
const prisma_1 = require("../../../prisma/src/index");
const roles_repository_1 = require("./repositories/roles.repository");
const logger_1 = require("../../../libs/logger/src/index");
const role_permissions_repository_1 = require("../role-permissions/repositories/role-permissions.repository");
const permissions_repository_1 = require("../permissions/repositories/permissions.repository");
const modules_repository_1 = require("../modules/repositories/modules.repository");
const applications_repository_1 = require("../applications/repositories/applications.repository");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_1.LoggerModule],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService, prisma_1.PrismaService, roles_repository_1.RolesRepository, role_permissions_repository_1.RolePermissionsRepository, permissions_repository_1.PermissionsRepository, modules_repository_1.ModulesRepository, applications_repository_1.ApplicationsRepository],
        exports: [roles_service_1.RolesService, roles_repository_1.RolesRepository],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map