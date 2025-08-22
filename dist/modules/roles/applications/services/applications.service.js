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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const applications_repository_1 = require("../repositories/applications.repository");
const modules_repository_1 = require("../../modules/repositories/modules.repository");
const permissions_repository_1 = require("../../permissions/repositories/permissions.repository");
const logger_1 = require("../../../../libs/logger/src/index");
let ApplicationsService = class ApplicationsService {
    repo;
    modulesRepo;
    permissionsRepo;
    logger;
    constructor(repo, modulesRepo, permissionsRepo, logger) {
        this.repo = repo;
        this.modulesRepo = modulesRepo;
        this.permissionsRepo = permissionsRepo;
        this.logger = logger;
    }
    create(dto) {
        try {
            this.logger.log(`Creando aplicación ${dto.name}`);
            return this.repo.create(dto);
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Aplicación con nombre ${dto.name} ya existe`);
                throw new common_1.BadRequestException(`Aplicación con nombre ${dto.name} ya existe`);
            }
            throw error;
        }
    }
    findAll() {
        this.logger.log('Obteniendo todas las aplicaciones');
        return this.repo.findAll();
    }
    findOne(id) {
        this.logger.log(`Obteniendo aplicación con ID ${id}`);
        return this.repo.findOne(id);
    }
    findAllWithModules() {
        this.logger.log('Obteniendo todas las aplicaciones con módulos');
        return this.repo.findAllWithModules();
    }
    update(id, dto) {
        try {
            this.logger.log(`Actualizando aplicación ${dto.name}`);
            return this.repo.update(id, dto);
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Aplicación con nombre ${dto.name} ya existe`);
                throw new common_1.BadRequestException(`Aplicación con nombre ${dto.name} ya existe`);
            }
            throw error;
        }
    }
    remove(id) {
        return this.repo.remove(id);
    }
    async getApplicationsStructure() {
        try {
            this.logger.log('Obteniendo estructura completa de aplicaciones, módulos y permisos');
            const applications = await this.repo.findAllWithModules();
            const structure = await Promise.all(applications.map(async (app) => {
                const modules = await this.modulesRepo.findAll();
                const modulesWithPermissions = await Promise.all(modules.map(async (module) => {
                    const permissions = await this.permissionsRepo.findAll();
                    return {
                        ...module,
                        permissions,
                    };
                }));
                return {
                    ...app,
                    modules: modulesWithPermissions,
                };
            }));
            return structure;
        }
        catch (error) {
            this.logger.error(`Error obteniendo estructura de aplicaciones: ${error.message}`);
            throw error;
        }
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [applications_repository_1.ApplicationsRepository,
        modules_repository_1.ModulesRepository,
        permissions_repository_1.PermissionsRepository,
        logger_1.AppLogger])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map