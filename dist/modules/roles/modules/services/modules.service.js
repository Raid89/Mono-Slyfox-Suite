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
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const modules_repository_1 = require("../repositories/modules.repository");
const logger_1 = require("../../../../libs/logger/src/index");
let ModulesService = class ModulesService {
    repo;
    logger;
    constructor(repo, logger) {
        this.repo = repo;
        this.logger = logger;
    }
    async create(dto) {
        try {
            this.logger.log(`Creando módulo ${dto.name}`);
            return await this.repo.create(dto);
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Módulo con nombre ${dto.name} ya existe`);
                throw new common_1.BadRequestException(`Módulo con nombre ${dto.name} ya existe`);
            }
            throw error;
        }
    }
    async findAll() {
        return await this.repo.findAll();
    }
    findOne(id) {
        return this.repo.findOne(id);
    }
    async update(id, dto) {
        try {
            this.logger.log(`Actualizando módulo ${dto.name}`);
            return await this.repo.update(id, dto);
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.logger.warn(`Módulo con nombre ${dto.name} ya existe`);
                throw new common_1.BadRequestException(`Módulo con nombre ${dto.name} ya existe`);
            }
            throw error;
        }
    }
    remove(id) {
        return this.repo.remove(id);
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [modules_repository_1.ModulesRepository,
        logger_1.AppLogger])
], ModulesService);
//# sourceMappingURL=modules.service.js.map