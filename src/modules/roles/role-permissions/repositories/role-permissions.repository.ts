import { Injectable } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';

@Injectable()
export class RolePermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRolePermissionDto) {
    return this.prisma.role_permissions.create({ data });
  }

  async findAll() {
    return this.prisma.role_permissions.findMany({
      select: {
        id: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.role_permissions.findUnique({
      where: { id },
      select: {
        id: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateRolePermissionDto) {
    return this.prisma.role_permissions.update({
      where: { id },
      data,
      include: {
        roles: true,
        permissions: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.role_permissions.delete({
      where: { id },
    });
  }

  findByRoleId(roleId: number) {
    return this.prisma.role_permissions.findMany({
      where: { role_id: roleId },
    });
  }
}
