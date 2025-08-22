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
exports.RolesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../prisma/src/index");
let RolesRepository = class RolesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createRoleDto) {
        const { company_id, ...rest } = createRoleDto;
        delete rest.permissionIds;
        return this.prisma.roles.create({
            data: {
                ...rest,
                companies: {
                    connect: { id: company_id },
                },
            },
        });
    }
    findAll() {
        return this.prisma.roles.findMany();
    }
    findOne(id) {
        return this.prisma.roles.findUnique({
            where: { id },
        });
    }
    findByCompanyId(companyId) {
        return this.prisma.roles.findMany({
            where: { company_id: companyId },
        });
    }
    update(id, updateRoleDto) {
        return this.prisma.roles.update({
            where: { id },
            data: updateRoleDto,
        });
    }
    remove(id) {
        return this.prisma.roles.delete({
            where: { id },
        });
    }
    findById(id) {
        return this.prisma.roles.findUnique({
            where: { id },
        });
    }
};
exports.RolesRepository = RolesRepository;
exports.RolesRepository = RolesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], RolesRepository);
//# sourceMappingURL=roles.repository.js.map