import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';

@Injectable()
export class PermissionsRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePermissionsDto) {
    return this.prisma.permissions.create({ data: dto });
  }

  async findAll() {
    return this.prisma.permissions.findMany(
      {
        include: {
          modules: true,
        }
      }
    );
  }

  async findOne(id: number) {
    const module = await this.prisma.permissions.findUnique({ where: { id }, include: { modules: true } });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: number, dto: UpdatePermissionsDto) {
    return this.prisma.permissions.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.permissions.delete({ where: { id } });
  }

  findById(id: number) {
    return this.prisma.permissions.findUnique({
      where: { id },
    });
  }
}
