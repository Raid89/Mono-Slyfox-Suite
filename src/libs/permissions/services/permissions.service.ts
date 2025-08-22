import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@slyfox-platform/prisma';

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async hasPermission(userId: number, permissionId: number): Promise<boolean> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role_permissions: {
              where: { permission_id: permissionId },
            },
          },
        },
      },
    });

    return (user?.roles?.role_permissions?.length ?? 0) > 0;
  }
}
