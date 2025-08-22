import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RolesDto } from '../dto/roles.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<RolesDto>;
    findAll(): Promise<RolesDto[]>;
    findOne(id: number): Promise<RolesDto>;
    findByCompanyId(companyId: number): Promise<RolesDto[]>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<RolesDto>;
    remove(id: number): Promise<void>;
    getRolePermissionsStructure(id: number): Promise<any>;
}
