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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../prisma/src/index");
let UsersRepository = class UsersRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findUsersPaginateByCompany(skip, limit, companyId) {
        const users = this.prismaService.users.findMany({
            skip,
            take: limit,
            where: {
                company_id: companyId
            },
            select: {
                id: true,
                name: true,
                email: true,
                is_active: true,
                document: true,
                roles: {
                    select: {
                        name: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return users;
    }
    async countUsersByCompany(companyId) {
        try {
            const count = await this.prismaService.users.count({
                where: {
                    company_id: companyId
                }
            });
            return count;
        }
        catch (error) {
            return 0;
        }
    }
    async createUser(createUserDto) {
        return this.prismaService.users.create({
            data: createUserDto
        });
    }
    async findUserById(id) {
        return this.prismaService.users.findUnique({
            where: { id },
            include: {
                roles: { select: { name: true } }
            }
        });
    }
    async updateUser(id, updateUserDto) {
        return this.prismaService.users.update({
            where: { id },
            data: updateUserDto
        });
    }
    async deleteUser(id) {
        return this.prismaService.users.delete({
            where: { id }
        });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map