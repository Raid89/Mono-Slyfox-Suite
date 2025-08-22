"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const role_permissions_service_1 = require("./services/role-permissions.service");
const role_permissions_controller_1 = require("./controllers/role-permissions.controller");
const role_permissions_repository_1 = require("./repositories/role-permissions.repository");
const logger_1 = require("../../../libs/logger/src/index");
const prisma_1 = require("../../../prisma/src/index");
const permissions_1 = require("../../../libs/permissions/src/index");
let RolePermissionsModule = class RolePermissionsModule {
};
exports.RolePermissionsModule = RolePermissionsModule;
exports.RolePermissionsModule = RolePermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_1.LoggerModule],
        controllers: [role_permissions_controller_1.RolePermissionsController],
        providers: [role_permissions_service_1.RolePermissionsService, role_permissions_repository_1.RolePermissionsRepository, prisma_1.PrismaService, permissions_1.PermissionsService],
        exports: [role_permissions_service_1.RolePermissionsService, role_permissions_repository_1.RolePermissionsRepository],
    })
], RolePermissionsModule);
//# sourceMappingURL=role-permissions.module.js.map