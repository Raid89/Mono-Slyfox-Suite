import { PrismaService } from '@slyfox-platform/prisma';
export declare class PermissionsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    hasPermission(userId: number, permissionId: number): Promise<boolean>;
}
