"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("../services/roles.service");
const create_role_dto_1 = require("../dto/create-role.dto");
const update_role_dto_1 = require("../dto/update-role.dto");
const roles_dto_1 = require("../dto/roles.dto");
const permissions_1 = require("../../../../libs/permissions");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    findAll() {
        return this.rolesService.findAll();
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    findByCompanyId(companyId) {
        return this.rolesService.findByCompanyId(companyId);
    }
    update(id, updateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
    async getRolePermissionsStructure(id) {
        return this.rolesService.getRolePermissionsStructure(id);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(permissions_1.PermissionsGuard),
    (0, permissions_1.Permission)(5),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, swagger_1.ApiBody)({ type: create_role_dto_1.CreateRoleDto }),
    (0, swagger_1.ApiResponse)({ type: roles_dto_1.RolesDto, description: 'Rol creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [roles_dto_1.RolesDto], description: 'Lista de roles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: roles_dto_1.RolesDto, description: 'Detalles de un rol' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('company/:companyId'),
    (0, swagger_1.ApiResponse)({ type: [roles_dto_1.RolesDto], description: 'Lista de roles por empresa' }),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findByCompanyId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(permissions_1.PermissionsGuard),
    (0, permissions_1.Permission)(6),
    (0, swagger_1.ApiBody)({ type: update_role_dto_1.UpdateRoleDto }),
    (0, swagger_1.ApiResponse)({ type: roles_dto_1.RolesDto, description: 'Rol actualizado exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(permissions_1.PermissionsGuard),
    (0, permissions_1.Permission)(7),
    (0, swagger_1.ApiResponse)({ description: 'Rol eliminado exitosamente' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/permissions-structure'),
    (0, swagger_1.ApiResponse)({
        description: 'Estructura completa de roles, permisos, módulos y aplicaciones',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRolePermissionsStructure", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map