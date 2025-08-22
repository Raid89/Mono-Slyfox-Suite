"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const prisma_1 = require("../../prisma/src/index");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../libs/email/email.service");
const jwt_strategy_1 = require("../../common/strategies/jwt.strategy");
const logger_1 = require("../../libs/logger/src/index");
const register_service_1 = require("./services/register.service");
const auth_service_1 = require("./services/auth.service");
const refresh_token_strategy_1 = require("../../common/strategies/refresh-token.strategy");
const roles_module_1 = require("../roles/roles/roles.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
                },
            }),
            logger_1.LoggerModule,
            roles_module_1.RolesModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            register_service_1.RegisterService,
            prisma_1.PrismaService,
            email_service_1.EmailService,
            jwt_strategy_1.JwtStrategy,
            refresh_token_strategy_1.JwtRefreshStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map