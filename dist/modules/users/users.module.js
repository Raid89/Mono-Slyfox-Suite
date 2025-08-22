"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const users_controller_1 = require("./controllers/users.controller");
const users_service_1 = require("./services/users.service");
const config_1 = require("@nestjs/config");
const prisma_1 = require("../../prisma/src/index");
const users_repository_1 = require("./repositories/users.repository");
const logger_1 = require("../../libs/logger/src/index");
const roles_module_1 = require("../roles/roles/roles.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            logger_1.LoggerModule,
            axios_1.HttpModule,
            roles_module_1.RolesModule
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            prisma_1.PrismaService,
            users_repository_1.UsersRepository,
            users_service_1.UsersService,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map