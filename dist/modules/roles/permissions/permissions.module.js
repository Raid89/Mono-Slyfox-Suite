"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./services/permissions.service");
const permissions_controller_1 = require("./controllers/permissions.controller");
const permissions_repository_1 = require("./repositories/permissions.repository");
const prisma_1 = require("../../../prisma/src/index");
const logger_1 = require("../../../libs/logger/src/index");
let PermissionsModule = class PermissionsModule {
};
exports.PermissionsModule = PermissionsModule;
exports.PermissionsModule = PermissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            logger_1.LoggerModule,
        ],
        controllers: [
            permissions_controller_1.PermissionsController,
        ],
        providers: [permissions_service_1.PermissionsService, permissions_repository_1.PermissionsRepository, prisma_1.PrismaService],
        exports: [permissions_service_1.PermissionsService, permissions_repository_1.PermissionsRepository],
    })
], PermissionsModule);
//# sourceMappingURL=permissions.module.js.map