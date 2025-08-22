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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../../../../libs/logger/src/index");
const roles_repository_1 = require("../repositories/roles.repository");
const role_permissions_repository_1 = require("../../role-permissions/repositories/role-permissions.repository");
const permissions_repository_1 = require("../../permissions/repositories/permissions.repository");
const modules_repository_1 = require("../../modules/repositories/modules.repository");
const applications_repository_1 = require("../../applications/repositories/applications.repository");
let RolesService = class RolesService {
    rolesRepository;
    rolePermissionsRepository;
    permissionsRepository;
    modulesRepository;
    applicationsRepository;
    logger;
    constructor(rolesRepository, rolePermissionsRepository, permissionsRepository, modulesRepository, applicationsRepository, logger) {
        this.rolesRepository = rolesRepository;
        this.rolePermissionsRepository = rolePermissionsRepository;
        this.permissionsRepository = permissionsRepository;
        this.modulesRepository = modulesRepository;
        this.applicationsRepository = applicationsRepository;
        this.logger = logger;
    }
    async create(createRoleDto) {
        try {
            this.logger.log(`Creando rol ${typeof createRoleDto.company_id} - ${createRoleDto.name}`);
            const role = await this.rolesRepository.create(createRoleDto);
            for (const permissionId of createRoleDto?.permissionIds || []) {
                await this.rolePermissionsRepository.create({
                    role_id: role.id,
                    permission_id: permissionId,
                });
                this.logger.log(`Asignado permiso ${permissionId} al rol ${role.id}`);
            }
            return role;
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Rol con nombre ${createRoleDto.name} ya existe`);
                throw new common_1.BadRequestException(`Rol con nombre ${createRoleDto.name} ya existe`);
            }
            if (error.code === 'P2003') {
                console.log(`Error al crear rol: ${error.message}`);
                this.logger.warn(`Empresa no encontrada`);
                throw new common_1.BadRequestException(`Empresa no encontrada`);
            }
            throw error;
        }
    }
    async findAll() {
        return await this.rolesRepository.findAll();
    }
    findOne(id) {
        return this.rolesRepository.findOne(id);
    }
    findByCompanyId(companyId) {
        return this.rolesRepository.findByCompanyId(companyId);
    }
    async update(id, updateRoleDto) {
        try {
            this.logger.log(`Actualizando rol ${updateRoleDto.name}`);
            return await this.rolesRepository.update(id, updateRoleDto);
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Rol con nombre ${updateRoleDto.name} ya existe`);
                throw new common_1.BadRequestException(`Rol con nombre ${updateRoleDto.name} ya existe`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.rolesRepository.remove(id);
            this.logger.log(`Rol con ID ${id} eliminado exitosamente`);
        }
        catch (error) {
            this.logger.error(`Error al eliminar el rol con ID ${id}`, error);
            throw error;
        }
    }
    async getRolePermissionsStructure(roleId) {
        try {
            const role = await this.rolesRepository.findById(roleId);
            if (!role) {
                throw new common_1.BadRequestException(`Rol con ID ${roleId} no encontrado`);
            }
            const rolePermissions = await this.rolePermissionsRepository.findByRoleId(roleId);
            const permissions = await Promise.all(rolePermissions.map(async (rp) => {
                const permission = await this.permissionsRepository.findById(rp.permission_id || 0);
                const module = await this.modulesRepository.findById(permission?.module_id || 0);
                const application = await this.applicationsRepository.findById(module?.application_id || 0);
                return {
                    permission,
                    module,
                    application,
                };
            }));
            return {
                role,
                permissions,
            };
        }
        catch (error) {
            this.logger.error(`Error obteniendo estructura de permisos para el rol ${roleId}: ${error.message}`);
            throw error;
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [roles_repository_1.RolesRepository,
        role_permissions_repository_1.RolePermissionsRepository,
        permissions_repository_1.PermissionsRepository,
        modules_repository_1.ModulesRepository,
        applications_repository_1.ApplicationsRepository,
        logger_1.AppLogger])
], RolesService);
//# sourceMappingURL=roles.service.js.map