import { Injectable } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findUsersPaginateByCompany(skip: number, limit: number, companyId: number) {
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
    })

    return users;
  }

  async countUsersByCompany(companyId: number) {
    try {
      const count = await this.prismaService.users.count({
        where: {
          company_id: companyId
        }
      })

      return count;
    } catch (error) {
      return 0;
    }
  }

  async createUser(createUserDto) {
    return this.prismaService.users.create({
      data: createUserDto
    });
  }

  async findUserById(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
      include: {
        roles: { select: { name: true } }
      }
    });
  }

  async updateUser(id: number, updateUserDto) {
    return this.prismaService.users.update({
      where: { id },
      data: updateUserDto
    });
  }

  async deleteUser(id: number) {
    return this.prismaService.users.delete({
      where: { id }
    });
  }
}
