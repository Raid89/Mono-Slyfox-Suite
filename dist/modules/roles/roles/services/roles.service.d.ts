import { AppLogger } from '@slyfox-platform/logger';
import { RolesRepository } from '../repositories/roles.repository';
import { RolePermissionsRepository } from '../../role-permissions/repositories/role-permissions.repository';
import { PermissionsRepository } from '../../permissions/repositories/permissions.repository';
import { ModulesRepository } from '../../modules/repositories/modules.repository';
import { ApplicationsRepository } from '../../applications/repositories/applications.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
export declare class RolesService {
    private readonly rolesRepository;
    private readonly rolePermissionsRepository;
    private readonly permissionsRepository;
    private readonly modulesRepository;
    private readonly applicationsRepository;
    private readonly logger;
    constructor(rolesRepository: RolesRepository, rolePermissionsRepository: RolePermissionsRepository, permissionsRepository: PermissionsRepository, modulesRepository: ModulesRepository, applicationsRepository: ApplicationsRepository, logger: AppLogger);
    create(createRoleDto: CreateRoleDto): Promise<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }>;
    findAll(): Promise<{
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
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        description: string | null;
        name: string;
        company_id: number | null;
        id: number;
    }>;
    remove(id: number): Promise<void>;
    getRolePermissionsStructure(roleId: number): Promise<any>;
}
