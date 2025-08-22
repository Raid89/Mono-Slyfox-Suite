import { PrismaService } from '@slyfox-platform/prisma';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
export declare class RolePermissionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRolePermissionDto): Promise<{
        id: number;
        role_id: number | null;
        permission_id: number | null;
    }>;
    findAll(): Promise<{
        permissions: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        };
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        permissions: {
            name: string;
            id: number;
        };
        roles: {
            name: string;
            id: number;
        };
        id: number;
    }>;
    update(id: number, data: UpdateRolePermissionDto): Promise<{
        permissions: {
            description: string | null;
            name: string;
            id: number;
            module_id: number | null;
        };
        roles: {
            description: string | null;
            name: string;
            company_id: number | null;
            id: number;
        };
    } & {
        id: number;
        role_id: number | null;
        permission_id: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        role_id: number | null;
        permission_id: number | null;
    }>;
    findByRoleId(roleId: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        role_id: number | null;
        permission_id: number | null;
    }[]>;
}
