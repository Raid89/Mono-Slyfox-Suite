import { ModulesService } from '../services/modules.service';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';
import { ModulesDto } from '../dto/modules.dto';
export declare class ModulesController {
    private readonly service;
    constructor(service: ModulesService);
    create(dto: CreateModulesDto): Promise<ModulesDto>;
    findAll(): Promise<ModulesDto[]>;
    findOne(id: string): Promise<ModulesDto>;
    update(id: string, dto: UpdateModulesDto): Promise<ModulesDto>;
    remove(id: string): Promise<void>;
}
