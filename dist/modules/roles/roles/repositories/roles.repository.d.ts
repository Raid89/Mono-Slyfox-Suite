import { PrismaService } from '@slyfox-platform/prisma';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
export declare class RolesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): import("@prisma/client").Prisma.Prisma__rolesClient<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__rolesClient<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByCompanyId(companyId: number): import("@prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }[]>;
    update(id: number, updateRoleDto: UpdateRoleDto): import("@prisma/client").Prisma.Prisma__rolesClient<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__rolesClient<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findById(id: number): import("@prisma/client").Prisma.Prisma__rolesClient<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
