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
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("../services/applications.service");
const create_application_dto_1 = require("../dto/create-application.dto");
const update_application_dto_1 = require("../dto/update-application.dto");
const swagger_1 = require("@nestjs/swagger");
const application_dto_1 = require("../dto/application.dto");
const prisma_to_dto_1 = require("../../../../common/utils/prisma-to-dto");
let ApplicationsController = class ApplicationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        const app = await this.service.create(dto);
        return (0, prisma_to_dto_1.prismaToDto)(application_dto_1.ApplicationDto, app);
    }
    findAll() {
        const app = this.service.findAll();
        return (0, prisma_to_dto_1.prismaToDto)(application_dto_1.ApplicationDto, app);
    }
    findAllWithModules() {
        const application = this.service.findAllWithModules();
        return (0, prisma_to_dto_1.prismaToDto)(application_dto_1.ApplicationDto, application);
    }
    async getApplicationsStructure() {
        const structure = await this.service.getApplicationsStructure();
        return structure;
    }
    findOne(id) {
        const app = this.service.findOne(+id);
        return (0, prisma_to_dto_1.prismaToDto)(application_dto_1.ApplicationDto, app);
    }
    update(id, dto) {
        const app = this.service.update(+id, dto);
        return (0, prisma_to_dto_1.prismaToDto)(application_dto_1.ApplicationDto, app);
    }
    remove(id) {
        this.service.remove(+id);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_application_dto_1.CreateApplicationDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [application_dto_1.ApplicationDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ApplicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('modules'),
    (0, swagger_1.ApiResponse)({ type: [application_dto_1.ApplicationDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ApplicationsController.prototype, "findAllWithModules", null);
__decorate([
    (0, common_1.Get)('structure'),
    (0, swagger_1.ApiResponse)({
        description: 'Estructura completa de aplicaciones, módulos y permisos',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getApplicationsStructure", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ type: application_dto_1.ApplicationDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", application_dto_1.ApplicationDto)
], ApplicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", application_dto_1.ApplicationDto)
], ApplicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "remove", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map