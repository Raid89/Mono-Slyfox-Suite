import { ModulesRepository } from '../repositories/modules.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';
export declare class ModulesService {
    private readonly repo;
    private readonly logger;
    constructor(repo: ModulesRepository, logger: AppLogger);
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
}
