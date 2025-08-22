import { Injectable } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
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

  findOne(id: number) {
    return this.prisma.roles.findUnique({
      where: { id },
    });
  }

  findByCompanyId(companyId: number) {
    return this.prisma.roles.findMany({
      where: { company_id: companyId },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.roles.delete({
      where: { id },
    });
  }

  findById(id: number) {
    return this.prisma.roles.findUnique({
      where: { id },
    });
  }
}
