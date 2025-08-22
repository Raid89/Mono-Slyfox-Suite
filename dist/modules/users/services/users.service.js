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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
const logger_1 = require("../../../libs/logger/src/index");
const bcrypt = __importStar(require("bcrypt"));
const roles_repository_1 = require("../../roles/roles/repositories/roles.repository");
let UsersService = class UsersService {
    usersRepository;
    logger;
    rolesRepository;
    constructor(usersRepository, logger, rolesRepository) {
        this.usersRepository = usersRepository;
        this.logger = logger;
        this.rolesRepository = rolesRepository;
    }
    async getUsersPaginateByCompany(page = 1, limit = 10, companyId) {
        try {
            this.logger.log(`Obteniendo usuarios para la empresa: ID: ${companyId}`, 'UsersService');
            const skip = (page - 1) * limit;
            const [users, total] = await Promise.all([
                this.usersRepository.findUsersPaginateByCompany(skip, limit, companyId),
                this.usersRepository.countUsersByCompany(companyId)
            ]);
            if (total < 1)
                throw new common_1.NotFoundException('No se han encontrado usuarios para esta empresa.');
            return {
                data: users,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            this.logger.error(`Error capturado: ${error.message}`, error.stack, 'UsersService');
            throw error;
        }
    }
    async createUser(createUserDto) {
        try {
            this.logger.log(`Creando usuario: ${createUserDto.email}`, 'UsersService');
            let role;
            try {
                role = await this.rolesRepository.findById(createUserDto.role_id);
            }
            catch (err) {
                this.logger.warn(`No se pudo obtener el rol ${createUserDto.role_id} desde el microservicio de roles: ${err.message}`);
                throw new common_1.BadRequestException('No se pudo validar el rol seleccionado.');
            }
            if (!role || role.company_id !== createUserDto.company_id) {
                this.logger.warn(`Rol ${createUserDto.role_id} no pertenece a la empresa ${createUserDto.company_id}`);
                throw new common_1.BadRequestException('El rol seleccionado no pertenece a la empresa.');
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const user = await this.usersRepository.createUser({
                ...createUserDto,
                password_hash: hashedPassword,
                password: undefined
            });
            return user;
        }
        catch (error) {
            this.logger.error(`Error creando usuario: ${error.message}`, error.stack, 'UsersService');
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUserById(id) {
        try {
            this.logger.log(`Buscando usuario por id: ${id}`, 'UsersService');
            const user = await this.usersRepository.findUserById(id);
            if (!user)
                throw new common_1.NotFoundException('Usuario no encontrado');
            return user;
        }
        catch (error) {
            this.logger.error(`Error buscando usuario: ${error.message}`, error.stack, 'UsersService');
            throw error;
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            this.logger.log(`Actualizando usuario id: ${id}`, 'UsersService');
            const data = { ...updateUserDto };
            if (updateUserDto.password) {
                data.password_hash = await bcrypt.hash(updateUserDto.password, 10);
                delete data.password;
            }
            const user = await this.usersRepository.updateUser(id, data);
            if (!user)
                throw new common_1.NotFoundException('Usuario no encontrado.');
            return user;
        }
        catch (error) {
            this.logger.error(`Error actualizando usuario: ${error.message}`, error.stack, 'UsersService');
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            this.logger.log(`Eliminando usuario id: ${id}`, 'UsersService');
            const user = await this.usersRepository.deleteUser(id);
            if (!user)
                throw new common_1.NotFoundException('Usuario no encontrado.');
            return user;
        }
        catch (error) {
            this.logger.error(`Error eliminando usuario: ${error.message}`, error.stack, 'UsersService');
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        logger_1.AppLogger,
        roles_repository_1.RolesRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map