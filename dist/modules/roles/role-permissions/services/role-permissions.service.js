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
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../../../../libs/logger/src/index");
const role_permissions_repository_1 = require("../repositories/role-permissions.repository");
let RolePermissionsService = class RolePermissionsService {
    repository;
    logger;
    constructor(repository, logger) {
        this.repository = repository;
        this.logger = logger;
    }
    async create(createRolePermissionDto) {
        try {
            this.logger.log(`Creating role permission for role ID ${createRolePermissionDto.role_id} and permission ID ${createRolePermissionDto.permission_id}`);
            console.log(createRolePermissionDto);
            return await this.repository.create(createRolePermissionDto);
        }
        catch (error) {
            if (error.code === 'P2003') {
                this.logger.warn(`Role or permission not found for IDs ${createRolePermissionDto.role_id} and ${createRolePermissionDto.permission_id}`);
                throw new common_1.BadRequestException('Role or permission not found');
            }
            if (error.code === 'P2002') {
                this.logger.warn(`Role permission already exists for role ID ${createRolePermissionDto.role_id} and permission ID ${createRolePermissionDto.permission_id}`);
                throw new common_1.BadRequestException('Role permission already exists');
            }
            throw error;
        }
    }
    async findAll() {
        this.logger.log('Fetching all role permissions');
        return await this.repository.findAll();
    }
    async findOne(id) {
        this.logger.log(`Fetching role permission with ID: ${id}`);
        const rolePermission = await this.repository.findOne(id);
        if (!rolePermission) {
            this.logger.warn(`Role permission with ID ${id} not found`);
            throw new common_1.NotFoundException(`Role permission with ID ${id} not found`);
        }
        return rolePermission;
    }
    async update(id, updateRolePermissionDto) {
        try {
            this.logger.log(`Updating role permission with ID: ${id}`);
            return await this.repository.update(id, updateRolePermissionDto);
        }
        catch (error) {
            if (error.code === 'P2003') {
                this.logger.warn(`Role or permission not found for IDs ${updateRolePermissionDto.role_id} and ${updateRolePermissionDto.permission_id}`);
                throw new common_1.BadRequestException('Role or permission not found');
            }
            if (error.code === 'P2002') {
                this.logger.warn(`Role permission already exists for role ID ${updateRolePermissionDto.role_id} and permission ID ${updateRolePermissionDto.permission_id}`);
                throw new common_1.BadRequestException('Role permission already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.repository.remove(id);
            this.logger.log(`Role permission with ID ${id} deleted successfully`);
        }
        catch (error) {
            this.logger.error(`Error deleting role permission with ID ${id}`, error);
            throw error;
        }
    }
};
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_permissions_repository_1.RolePermissionsRepository,
        logger_1.AppLogger])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map