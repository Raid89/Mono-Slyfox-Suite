import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RolePermissionsService } from '../services/role-permissions.service';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { RolePermissionsDetailDto, RolePermissionsDto } from '../dto/role-permissions.dto';

@ApiTags('Role Permissions')
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post()
  @ApiBody({ type: CreateRolePermissionDto })
  @ApiResponse({ type: RolePermissionsDto, description: 'Role Permission created successfully' })
  async create(@Body() createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionsDto> {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  @Get()
  @ApiResponse({ type: [RolePermissionsDetailDto], description: 'List of Role Permissions' })
  async findAll(): Promise<RolePermissionsDetailDto[]> {
    return this.rolePermissionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: RolePermissionsDetailDto, description: 'Details of a Role Permission' })
  async findOne(@Param('id') id: number): Promise<RolePermissionsDetailDto> {
    return await this.rolePermissionsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateRolePermissionDto })
  @ApiResponse({ type: RolePermissionsDto, description: 'Role Permission updated successfully' })
  async update(@Param('id') id: number, @Body() updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermissionsDto> {
    return this.rolePermissionsService.update(id, updateRolePermissionDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Role Permission deleted successfully' })
  remove(@Param('id') id: number): Promise<void> {
    return this.rolePermissionsService.remove(id);
  }
}
