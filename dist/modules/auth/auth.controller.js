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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_company_user_dto_1 = require("./dto/register-company-user.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const register_service_1 = require("./services/register.service");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./services/auth.service");
const get_current_user_id_decorator_1 = require("../../common/decorators/get-current-user-id.decorator");
let AuthController = class AuthController {
    registerService;
    authService;
    constructor(registerService, authService) {
        this.registerService = registerService;
        this.authService = authService;
    }
    register(dto) {
        console.log('Registering company and user:', JSON.stringify(dto));
        return this.registerService.register(dto);
    }
    async confirm(token, res, req) {
        const status = await this.registerService.confirm(token);
        const origin = process.env.FRONTEND_ORIGIN;
        const url = `${origin || 'https://suite.slyfox.com.co'}/login?verify=${status ? 'true' : 'false'}`;
        return res.redirect(url);
    }
    getMe(userId) {
        console.log(`User ID: ${userId}`);
        return this.authService.getCurrentUserInformation(userId);
    }
    login(dto) {
        return this.authService.login(dto);
    }
    logout(userId) {
        return this.authService.logout(userId);
    }
    refreshTokens(userId, req) {
        const refreshToken = req.headers['rf-token-session'];
        if (!refreshToken) {
            throw new common_1.ForbiddenException('Token de refresco no proporcionado');
        }
        return this.authService.refreshTokens(userId, refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: register_company_user_dto_1.RegisterCompanyAndUserDto }),
    (0, swagger_1.ApiOperation)({ summary: 'Registro de empresa y usuario administrador' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Correo de verificación enviado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('confirm'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirmar correo y activar cuenta' }),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener info del usuario autenticado' }),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inicio de sesión exitoso, el accessToken tiene una duración de 10000ms' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cerrar sesión' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sesión cerrada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acceso denegado' }),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({ name: 'rf-token-session', description: 'Token de refresco para la sesión' }),
    (0, swagger_1.ApiOperation)({ summary: 'Refrescar tokens de acceso' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tokens refrescados exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Token de refresco inválido o expirado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de refresco no proporcionado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Solicitud incorrecta' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error interno del servidor' }),
    (0, swagger_1.ApiOperation)({ summary: 'Refrescar tokens de acceso' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_service_1.RegisterService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map