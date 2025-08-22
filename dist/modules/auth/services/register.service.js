"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../prisma/src/index");
const email_service_1 = require("../../../libs/email/email.service");
const logger_1 = require("../../../libs/logger/src/index");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const roles_service_1 = require("../../roles/roles/services/roles.service");
let RegisterService = class RegisterService {
    prisma;
    emailService;
    logger;
    rolesService;
    constructor(prisma, emailService, logger, rolesService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.logger = logger;
        this.rolesService = rolesService;
    }
    async register(dto) {
        this.logger.log(`Intentando registrar empresa ${dto.company.name}`, 'AuthService');
        const existingCompany = await this.prisma.companies.findFirst({
            where: {
                OR: [{ nit: dto.company.nit }, { email: dto.company.email }],
            },
        });
        if (existingCompany) {
            this.logger.warn(`Empresa ya existe: ${dto.company.nit} o ${dto.company.email}`, 'AuthService');
            throw new common_1.ConflictException('Ya existe una empresa registrada con ese NIT o correo');
        }
        const existingUser = await this.prisma.users.findUnique({
            where: { email: dto.company.email },
        });
        if (existingUser) {
            this.logger.warn(`Usuario ya existe: ${dto.user.email}`, 'AuthService');
            throw new common_1.ConflictException('Ese correo ya está registrado como usuario');
        }
        try {
            const company = await this.prisma.companies.create({
                data: {
                    name: dto.company.name,
                    nit: dto.company.nit,
                    address: dto.company.address,
                    phone: dto.company.phone,
                    email: dto.company.email,
                    isActive: false,
                },
            });
            this.logger.log(`Empresa creada: ID ${company.id}`, 'AuthService');
            const hashedPassword = await bcrypt.hash(dto.user.password, 10);
            const verificationToken = (0, crypto_1.randomUUID)();
            const role = await this.createOwnerRole(company.id);
            const user = await this.prisma.users.create({
                data: {
                    name: dto.user.fullName,
                    document: dto.user.document,
                    email: dto.user.email,
                    password_hash: hashedPassword,
                    company_id: company.id,
                    isEmailVerified: false,
                    email_verification_token: verificationToken,
                    role_id: role.id,
                },
            });
            this.logger.log(`Usuario creado: ID ${user.id}`, 'AuthService');
            try {
                await this.emailService.sendConfirmation(dto.user.email, verificationToken);
                this.logger.log(`Correo de verificación enviado a ${dto.user.email}`, 'AuthService');
            }
            catch (error) {
                this.logger.error(`Fallo al enviar correo a ${dto.user.email}`, error.message, 'AuthService');
                await this.prisma.users.delete({ where: { email: dto.user.email } });
                await this.prisma.companies.delete({ where: { id: company.id } });
                throw new common_1.BadRequestException('No se pudo enviar el correo de verificación. Intenta más tarde.');
            }
            return {
                message: 'Registro exitoso. Verifica tu correo para activar la cuenta.',
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            this.logger.error(errorMessage, 'RegisterService');
            throw new common_1.BadRequestException(errorMessage);
        }
    }
    async confirm(token) {
        this.logger.log(`Confirmando token: ${token}`, 'AuthService');
        const user = await this.prisma.users.findFirst({
            where: { email_verification_token: token },
            include: { companies: true },
        });
        if (!user) {
            this.logger.warn(`Token inválido: ${token}`, 'AuthService');
            return false;
        }
        await this.prisma.users.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                email_verification_token: null,
            },
        });
        await this.prisma.companies.update({
            where: { id: user.company_id || 1 },
            data: { isActive: true },
        });
        this.logger.log(`Usuario y empresa activados: ${user.email}`, 'AuthService');
        return true;
    }
    async getMe(user) {
        this.logger.log(`Obteniendo perfil del usuario: ${user.email}`, 'RegisterService');
        await Promise.resolve();
        return { email: user.email };
    }
    async createOwnerRole(companyId) {
        const role = await this.rolesService.create({
            name: 'owner',
            company_id: companyId,
            permissionIds: [1],
        });
        this.logger.log(`Rol de propietario creado para la empresa ID ${companyId}`, 'AuthService');
        return role;
    }
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        email_service_1.EmailService,
        logger_1.AppLogger,
        roles_service_1.RolesService])
], RegisterService);
//# sourceMappingURL=register.service.js.map