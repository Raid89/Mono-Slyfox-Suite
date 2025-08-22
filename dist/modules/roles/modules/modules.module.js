"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesModule = void 0;
const common_1 = require("@nestjs/common");
const modules_service_1 = require("./services/modules.service");
const modules_controller_1 = require("./controllers/modules.controller");
const modules_repository_1 = require("./repositories/modules.repository");
const prisma_1 = require("../../../prisma/src/index");
const logger_1 = require("../../../libs/logger/src/index");
let ModulesModule = class ModulesModule {
};
exports.ModulesModule = ModulesModule;
exports.ModulesModule = ModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            logger_1.LoggerModule,
        ],
        controllers: [
            modules_controller_1.ModulesController,
        ],
        providers: [modules_service_1.ModulesService, modules_repository_1.ModulesRepository, prisma_1.PrismaService],
        exports: [modules_service_1.ModulesService, modules_repository_1.ModulesRepository],
    })
], ModulesModule);
//# sourceMappingURL=modules.module.js.map