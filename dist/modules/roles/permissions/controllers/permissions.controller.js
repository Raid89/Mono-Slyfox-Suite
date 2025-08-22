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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("../services/permissions.service");
const prisma_to_dto_1 = require("../../../../common/utils/prisma-to-dto");
const swagger_1 = require("@nestjs/swagger");
const create_permissions_dto_1 = require("../dto/create-permissions.dto");
const update_permissions_dto_1 = require("../dto/update-permissions.dto");
const permissions_dto_1 = require("../dto/permissions.dto");
let PermissionsController = class PermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        const module = await this.service.create(dto);
        return (0, prisma_to_dto_1.prismaToDto)(permissions_dto_1.PermissionsDto, module);
    }
    async findAll() {
        const permissions = await this.service.findAll();
        return (0, prisma_to_dto_1.prismaToDto)(permissions_dto_1.PermissionsDto, permissions);
    }
    async findOne(id) {
        const module = await this.service.findOne(+id);
        return (0, prisma_to_dto_1.prismaToDto)(permissions_dto_1.PermissionsDto, module);
    }
    async update(id, dto) {
        const module = await this.service.update(+id, dto);
        return (0, prisma_to_dto_1.prismaToDto)(permissions_dto_1.PermissionsDto, module);
    }
    async remove(id) {
        await this.service.remove(+id);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_permissions_dto_1.CreatePermissionsDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permissions_dto_1.CreatePermissionsDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [permissions_dto_1.PermissionsDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: permissions_dto_1.PermissionsDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permissions_dto_1.UpdatePermissionsDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "remove", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map