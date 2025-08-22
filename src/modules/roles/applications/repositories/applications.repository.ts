import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';

@Injectable()
export class ApplicationsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateApplicationDto) {
    return this.prisma.applications.create({ data: dto });
  }

  async findAll() {
    return this.prisma.applications.findMany();
  }

  async findOne(id: number) {
    const app = await this.prisma.applications.findUnique({ where: { id: Number(id) } });
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async findAllWithModules() {
    return this.prisma.applications.findMany({
      include: {
        modules: true,
      }
    });
  }

  async update(id: number, dto: UpdateApplicationDto) {
    return this.prisma.applications.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.applications.delete({ where: { id } });
  }

  findById(id: number) {
    return this.prisma.applications.findUnique({
      where: { id },
    });
  }
}
