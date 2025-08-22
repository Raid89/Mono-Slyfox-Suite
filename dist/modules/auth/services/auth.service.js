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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../prisma/src/index");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.prisma.users.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Credenciales invalidas');
        }
        if (!user.isEmailVerified) {
            throw new common_1.ForbiddenException('Por favor verifica tu correo');
        }
        if (!user.is_active) {
            throw new common_1.ForbiddenException('Usuario inactivo');
        }
        if (!(await bcrypt_1.default.compare(dto.password, user.password_hash))) {
            throw new common_1.ForbiddenException('Credenciales invalidas');
        }
        const jti = (0, crypto_1.randomUUID)();
        const tokens = await this.generateTokens(user.id, user.email, jti);
        await this.storeRefreshToken(user.id, tokens.refreshToken, jti);
        const authData = { ...tokens, userId: user.id, email: user.email };
        return authData;
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });
        if (!user || !user.hashedRt) {
            throw new common_1.ForbiddenException('Acceso denegado');
        }
        const rtMatches = await bcrypt_1.default.compare(refreshToken, user.hashedRt);
        if (!rtMatches) {
            throw new common_1.ForbiddenException('Token de actualización inválido');
        }
        const decoded = this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        if (decoded.jti !== user.currentJti) {
            throw new common_1.ForbiddenException('Token ya fue rotado o no es válido');
        }
        const newJti = (0, crypto_1.randomUUID)();
        const tokens = await this.generateTokens(user.id, user.email, newJti);
        await this.storeRefreshToken(user.id, tokens.refreshToken, newJti);
        return tokens;
    }
    async logout(userId) {
        await this.prisma.users.update({
            where: { id: userId },
            data: { hashedRt: null },
        });
        return { message: 'Sesión cerrada exitosamente' };
    }
    async generateTokens(userId, email, jti) {
        const payload = { id: userId, email, jti };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async storeRefreshToken(userId, refreshToken, jti) {
        console.log(refreshToken);
        const hashedRt = await bcrypt_1.default.hash(refreshToken, 10);
        await this.prisma.users.update({
            where: { id: userId },
            data: { hashedRt, currentJti: jti },
        });
    }
    async getCurrentUserInformation(userId) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                company_id: true,
                roles: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Usuario no encontrado');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            companyId: user.company_id,
            roles: user.roles.name
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map