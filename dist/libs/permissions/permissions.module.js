"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsValidationModule = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./services/permissions.service");
const permissions_guard_1 = require("./guards/permissions.guard");
const core_1 = require("@nestjs/core");
const prisma_1 = require("../../prisma/src/index");
let PermissionsValidationModule = class PermissionsValidationModule {
};
exports.PermissionsValidationModule = PermissionsValidationModule;
exports.PermissionsValidationModule = PermissionsValidationModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [permissions_service_1.PermissionsService, permissions_guard_1.PermissionsGuard, core_1.Reflector, prisma_1.PrismaService],
        exports: [permissions_service_1.PermissionsService, permissions_guard_1.PermissionsGuard],
    })
], PermissionsValidationModule);
//# sourceMappingURL=permissions.module.js.map