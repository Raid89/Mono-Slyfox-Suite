import { PrismaService } from '@slyfox-platform/prisma';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
export declare class ApplicationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateApplicationDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        created_at: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
    }>;
    findAllWithModules(): Promise<({
        modules: {
            description: string | null;
            name: string;
            id: number;
            created_at: Date | null;
            application_id: number | null;
        }[];
    } & {
        name: string;
        id: number;
        created_at: Date;
    })[]>;
    update(id: number, dto: UpdateApplicationDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
    }>;
    findById(id: number): import("@prisma/client").Prisma.Prisma__applicationsClient<{
        name: string;
        id: number;
        created_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
