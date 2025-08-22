import { BadRequestException, Injectable } from '@nestjs/common';
import { AppLogger } from '@slyfox-platform/logger';
import { RolesRepository } from '../repositories/roles.repository';
import { RolePermissionsRepository } from '../../role-permissions/repositories/role-permissions.repository';
import { PermissionsRepository } from '../../permissions/repositories/permissions.repository';
import { ModulesRepository } from '../../modules/repositories/modules.repository';
import { ApplicationsRepository } from '../../applications/repositories/applications.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly rolePermissionsRepository: RolePermissionsRepository,
    private readonly permissionsRepository: PermissionsRepository,
    private readonly modulesRepository: ModulesRepository,
    private readonly applicationsRepository: ApplicationsRepository,
    private readonly logger: AppLogger,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      this.logger.log(
        `Creando rol ${typeof createRoleDto.company_id} - ${createRoleDto.name}`,
      );
      const role = await this.rolesRepository.create(createRoleDto);

      // Crear role-permissions
      for (const permissionId of createRoleDto?.permissionIds || []) {
        await this.rolePermissionsRepository.create({
          role_id: role.id,
          permission_id: permissionId,
        });
        this.logger.log(`Asignado permiso ${permissionId} al rol ${role.id}`);
      }

      return role;
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.warn(`Rol con nombre ${createRoleDto.name} ya existe`);
        throw new BadRequestException(
          `Rol con nombre ${createRoleDto.name} ya existe`,
        );
      }

      if (error.code === 'P2003') {
        console.log(`Error al crear rol: ${error.message}`);
        this.logger.warn(`Empresa no encontrada`);
        throw new BadRequestException(`Empresa no encontrada`);
      }
      throw error;
    }
  }

  async findAll() {
    return await this.rolesRepository.findAll();
  }

  findOne(id: number) {
    return this.rolesRepository.findOne(id);
  }

  findByCompanyId(companyId: number) {
    return this.rolesRepository.findByCompanyId(companyId);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      this.logger.log(`Actualizando rol ${updateRoleDto.name}`);
      return await this.rolesRepository.update(id, updateRoleDto);
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.warn(`Rol con nombre ${updateRoleDto.name} ya existe`);
        throw new BadRequestException(
          `Rol con nombre ${updateRoleDto.name} ya existe`,
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.rolesRepository.remove(id);
      this.logger.log(`Rol con ID ${id} eliminado exitosamente`);
    } catch (error) {
      this.logger.error(`Error al eliminar el rol con ID ${id}`, error);
      throw error;
    }
  }

  async getRolePermissionsStructure(roleId: number): Promise<any> {
    try {
      const role = await this.rolesRepository.findById(roleId);
      if (!role) {
        throw new BadRequestException(`Rol con ID ${roleId} no encontrado`);
      }

      const rolePermissions =
        await this.rolePermissionsRepository.findByRoleId(roleId);
      const permissions = await Promise.all(
        rolePermissions.map(async (rp) => {
          const permission = await this.permissionsRepository.findById(
            rp.permission_id || 0,
          );
          const module = await this.modulesRepository.findById(
            permission?.module_id || 0,
          );
          const application = await this.applicationsRepository.findById(
            module?.application_id || 0,
          );

          return {
            permission,
            module,
            application,
          };
        }),
      );

      return {
        role,
        permissions,
      };
    } catch (error) {
      this.logger.error(
        `Error obteniendo estructura de permisos para el rol ${roleId}: ${error.message}`,
      );
      throw error;
    }
  }
}
