import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '@slyfox-platform/logger';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { RolePermissionsRepository } from '../repositories/role-permissions.repository';

@Injectable()
export class RolePermissionsService {
  constructor(
    private readonly repository: RolePermissionsRepository,
    private readonly logger: AppLogger,
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    try {
      this.logger.log(`Creating role permission for role ID ${createRolePermissionDto.role_id} and permission ID ${createRolePermissionDto.permission_id}`);
      console.log(createRolePermissionDto);
      return await this.repository.create(createRolePermissionDto);
    } catch (error) {

      if (error.code === 'P2003') {
        this.logger.warn(`Role or permission not found for IDs ${createRolePermissionDto.role_id} and ${createRolePermissionDto.permission_id}`);
        throw new BadRequestException('Role or permission not found');
      }

      if (error.code === 'P2002') {
        this.logger.warn(`Role permission already exists for role ID ${createRolePermissionDto.role_id} and permission ID ${createRolePermissionDto.permission_id}`);
        throw new BadRequestException('Role permission already exists');
      }
      throw error;
    }
  }

  async findAll() {
    this.logger.log('Fetching all role permissions');
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    this.logger.log(`Fetching role permission with ID: ${id}`);
    const rolePermission = await this.repository.findOne(id);
    if (!rolePermission) {
      this.logger.warn(`Role permission with ID ${id} not found`);
      throw new NotFoundException(`Role permission with ID ${id} not found`);
    }
    return rolePermission;
  }

  async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    try {
      this.logger.log(`Updating role permission with ID: ${id}`);
      return await this.repository.update(id, updateRolePermissionDto);
    } catch (error) {
      if (error.code === 'P2003') {
        this.logger.warn(`Role or permission not found for IDs ${updateRolePermissionDto.role_id} and ${updateRolePermissionDto.permission_id}`);
        throw new BadRequestException('Role or permission not found');
      }

      if (error.code === 'P2002') {
        this.logger.warn(`Role permission already exists for role ID ${updateRolePermissionDto.role_id} and permission ID ${updateRolePermissionDto.permission_id}`);
        throw new BadRequestException('Role permission already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.repository.remove(id);
      this.logger.log(`Role permission with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting role permission with ID ${id}`, error);
      throw error;
    }
  }
}
