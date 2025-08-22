import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';
import { PermissionsDto } from '../dto/permissions.dto';
export declare class PermissionsController {
    private readonly service;
    constructor(service: PermissionsService);
    create(dto: CreatePermissionsDto): Promise<PermissionsDto>;
    findAll(): Promise<PermissionsDto[]>;
    findOne(id: string): Promise<PermissionsDto>;
    update(id: string, dto: UpdatePermissionsDto): Promise<PermissionsDto>;
    remove(id: string): Promise<void>;
}
