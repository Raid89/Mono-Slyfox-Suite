import { PrismaService } from '@slyfox-platform/prisma';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';
export declare class ModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateModulesDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }>;
    findAll(): Promise<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }[]>;
    findOne(id: number): Promise<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }>;
    update(id: number, dto: UpdateModulesDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }>;
    findById(id: number): import("@prisma/client").Prisma.Prisma__modulesClient<{
        description: string | null;
        name: string;
        id: number;
        created_at: Date | null;
        application_id: number | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
