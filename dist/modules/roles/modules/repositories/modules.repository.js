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
exports.ModulesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../prisma/src/index");
let ModulesRepository = class ModulesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.modules.create({ data: dto });
    }
    async findAll() {
        return this.prisma.modules.findMany();
    }
    async findOne(id) {
        const module = await this.prisma.modules.findUnique({ where: { id } });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        return module;
    }
    async update(id, dto) {
        return this.prisma.modules.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        return this.prisma.modules.delete({ where: { id } });
    }
    findById(id) {
        return this.prisma.modules.findUnique({
            where: { id },
        });
    }
};
exports.ModulesRepository = ModulesRepository;
exports.ModulesRepository = ModulesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ModulesRepository);
//# sourceMappingURL=modules.repository.js.map