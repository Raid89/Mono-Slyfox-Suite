import { RolePermissionsService } from '../services/role-permissions.service';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { RolePermissionsDetailDto, RolePermissionsDto } from '../dto/role-permissions.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionsDto>;
    findAll(): Promise<RolePermissionsDetailDto[]>;
    findOne(id: number): Promise<RolePermissionsDetailDto>;
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermissionsDto>;
    remove(id: number): Promise<void>;
}
