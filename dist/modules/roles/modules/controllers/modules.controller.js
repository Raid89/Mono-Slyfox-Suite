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
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const modules_service_1 = require("../services/modules.service");
const prisma_to_dto_1 = require("../../../../common/utils/prisma-to-dto");
const swagger_1 = require("@nestjs/swagger");
const create_modules_dto_1 = require("../dto/create-modules.dto");
const update_modules_dto_1 = require("../dto/update-modules.dto");
const modules_dto_1 = require("../dto/modules.dto");
let ModulesController = class ModulesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        const module = await this.service.create(dto);
        return (0, prisma_to_dto_1.prismaToDto)(modules_dto_1.ModulesDto, module);
    }
    async findAll() {
        const modules = await this.service.findAll();
        return (0, prisma_to_dto_1.prismaToDto)(modules_dto_1.ModulesDto, modules);
    }
    async findOne(id) {
        const module = await this.service.findOne(+id);
        return (0, prisma_to_dto_1.prismaToDto)(modules_dto_1.ModulesDto, module);
    }
    async update(id, dto) {
        const module = await this.service.update(+id, dto);
        return (0, prisma_to_dto_1.prismaToDto)(modules_dto_1.ModulesDto, module);
    }
    async remove(id) {
        await this.service.remove(+id);
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_modules_dto_1.CreateModulesDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_modules_dto_1.CreateModulesDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [modules_dto_1.ModulesDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: modules_dto_1.ModulesDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_modules_dto_1.UpdateModulesDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "remove", null);
exports.ModulesController = ModulesController = __decorate([
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map