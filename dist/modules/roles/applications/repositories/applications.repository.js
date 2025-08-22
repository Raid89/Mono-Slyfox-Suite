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
exports.ApplicationsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../prisma/src/index");
let ApplicationsRepository = class ApplicationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.applications.create({ data: dto });
    }
    async findAll() {
        return this.prisma.applications.findMany();
    }
    async findOne(id) {
        const app = await this.prisma.applications.findUnique({ where: { id: Number(id) } });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        return app;
    }
    async findAllWithModules() {
        return this.prisma.applications.findMany({
            include: {
                modules: true,
            }
        });
    }
    async update(id, dto) {
        return this.prisma.applications.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        return this.prisma.applications.delete({ where: { id } });
    }
    findById(id) {
        return this.prisma.applications.findUnique({
            where: { id },
        });
    }
};
exports.ApplicationsRepository = ApplicationsRepository;
exports.ApplicationsRepository = ApplicationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ApplicationsRepository);
//# sourceMappingURL=applications.repository.js.map