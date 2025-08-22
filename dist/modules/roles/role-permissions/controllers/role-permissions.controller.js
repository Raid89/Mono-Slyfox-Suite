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
exports.RolePermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_permissions_service_1 = require("../services/role-permissions.service");
const create_role_permission_dto_1 = require("../dto/create-role-permission.dto");
const update_role_permission_dto_1 = require("../dto/update-role-permission.dto");
const role_permissions_dto_1 = require("../dto/role-permissions.dto");
let RolePermissionsController = class RolePermissionsController {
    rolePermissionsService;
    constructor(rolePermissionsService) {
        this.rolePermissionsService = rolePermissionsService;
    }
    async create(createRolePermissionDto) {
        return this.rolePermissionsService.create(createRolePermissionDto);
    }
    async findAll() {
        return this.rolePermissionsService.findAll();
    }
    async findOne(id) {
        return await this.rolePermissionsService.findOne(id);
    }
    async update(id, updateRolePermissionDto) {
        return this.rolePermissionsService.update(id, updateRolePermissionDto);
    }
    remove(id) {
        return this.rolePermissionsService.remove(id);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_role_permission_dto_1.CreateRolePermissionDto }),
    (0, swagger_1.ApiResponse)({ type: role_permissions_dto_1.RolePermissionsDto, description: 'Role Permission created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_permission_dto_1.CreateRolePermissionDto]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [role_permissions_dto_1.RolePermissionsDetailDto], description: 'List of Role Permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: role_permissions_dto_1.RolePermissionsDetailDto, description: 'Details of a Role Permission' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBody)({ type: update_role_permission_dto_1.UpdateRolePermissionDto }),
    (0, swagger_1.ApiResponse)({ type: role_permissions_dto_1.RolePermissionsDto, description: 'Role Permission updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_permission_dto_1.UpdateRolePermissionDto]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ description: 'Role Permission deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "remove", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, swagger_1.ApiTags)('Role Permissions'),
    (0, common_1.Controller)('role-permissions'),
    __metadata("design:paramtypes", [role_permissions_service_1.RolePermissionsService])
], RolePermissionsController);
//# sourceMappingURL=role-permissions.controller.js.map