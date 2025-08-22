import { PrismaService } from '@slyfox-platform/prisma';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';
export declare class PermissionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePermissionsDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    }>;
    findAll(): Promise<({
        modules: {
            description: string | null;
            name: string;
            id: number;
            created_at: Date | null;
            application_id: number | null;
        };
    } & {
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    })[]>;
    findOne(id: number): Promise<{
        modules: {
            description: string | null;
            name: string;
            id: number;
            created_at: Date | null;
            application_id: number | null;
        };
    } & {
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    }>;
    update(id: number, dto: UpdatePermissionsDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    }>;
    findById(id: number): import("@prisma/client").Prisma.Prisma__permissionsClient<{
        description: string | null;
        name: string;
        id: number;
        module_id: number | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
