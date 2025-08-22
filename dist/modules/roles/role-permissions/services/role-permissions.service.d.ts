import { AppLogger } from '@slyfox-platform/logger';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { RolePermissionsRepository } from '../repositories/role-permissions.repository';
export declare class RolePermissionsService {
    private readonly repository;
    private readonly logger;
    constructor(repository: RolePermissionsRepository, logger: AppLogger);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<{
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
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<{
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
    remove(id: number): Promise<void>;
}
