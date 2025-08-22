import { ApplicationsRepository } from '../repositories/applications.repository';
import { ModulesRepository } from '../../modules/repositories/modules.repository';
import { PermissionsRepository } from '../../permissions/repositories/permissions.repository';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { AppLogger } from '@slyfox-platform/logger';
export declare class ApplicationsService {
    private readonly repo;
    private readonly modulesRepo;
    private readonly permissionsRepo;
    private readonly logger;
    constructor(repo: ApplicationsRepository, modulesRepo: ModulesRepository, permissionsRepo: PermissionsRepository, logger: AppLogger);
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
    getApplicationsStructure(): Promise<any>;
}
