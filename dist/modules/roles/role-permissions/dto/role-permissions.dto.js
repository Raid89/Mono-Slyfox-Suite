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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsDetailDto = exports.RolePermissionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const roles_dto_1 = require("../../roles/dto/roles.dto");
const permissions_dto_1 = require("../../permissions/dto/permissions.dto");
class RolePermissionsDto {
    id;
    role_id;
    permission_id;
}
exports.RolePermissionsDto = RolePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role Permission ID' }),
    __metadata("design:type", Number)
], RolePermissionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID' }),
    __metadata("design:type", Number)
], RolePermissionsDto.prototype, "role_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission ID' }),
    __metadata("design:type", Number)
], RolePermissionsDto.prototype, "permission_id", void 0);
class RolePermissionsDetailDto {
    id;
    roles;
    permissions;
}
exports.RolePermissionsDetailDto = RolePermissionsDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role Permission ID' }),
    __metadata("design:type", Number)
], RolePermissionsDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role details', type: roles_dto_1.RolesDto }),
    __metadata("design:type", Object)
], RolePermissionsDetailDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission details', type: permissions_dto_1.PermissionsDto }),
    __metadata("design:type", Object)
], RolePermissionsDetailDto.prototype, "permissions", void 0);
//# sourceMappingURL=role-permissions.dto.js.map