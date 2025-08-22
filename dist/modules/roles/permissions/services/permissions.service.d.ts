import { PermissionsRepository } from '../repositories/permissions.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';
export declare class PermissionsService {
    private readonly repo;
    private readonly logger;
    constructor(repo: PermissionsRepository, logger: AppLogger);
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
}
