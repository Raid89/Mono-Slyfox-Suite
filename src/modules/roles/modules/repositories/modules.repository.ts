import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';

@Injectable()
export class ModulesRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateModulesDto) {
    return this.prisma.modules.create({ data: dto });
  }

  async findAll() {
    return this.prisma.modules.findMany();
  }

  async findOne(id: number) {
    const module = await this.prisma.modules.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: number, dto: UpdateModulesDto) {
    return this.prisma.modules.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.modules.delete({ where: { id } });
  }

  findById(id: number) {
    return this.prisma.modules.findUnique({
      where: { id },
    });
  }
}
