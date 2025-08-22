import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RolesDto } from '../dto/roles.dto';
import { Permission, PermissionsGuard } from '@libs/permissions';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permission(5)
  @ApiSecurity('bearer')
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ type: RolesDto, description: 'Rol creado exitosamente' })
  create(@Body() createRoleDto: CreateRoleDto): Promise<RolesDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({ type: [RolesDto], description: 'Lista de roles' })
  findAll(): Promise<RolesDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: RolesDto, description: 'Detalles de un rol' })
  findOne(@Param('id') id: number): Promise<RolesDto> {
    return this.rolesService.findOne(id);
  }

  @Get('company/:companyId')
  @ApiResponse({ type: [RolesDto], description: 'Lista de roles por empresa' })
  findByCompanyId(@Param('companyId') companyId: number): Promise<RolesDto[]> {
    return this.rolesService.findByCompanyId(companyId);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permission(6)
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ type: RolesDto, description: 'Rol actualizado exitosamente' })
  update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RolesDto> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permission(7)
  @ApiResponse({ description: 'Rol eliminado exitosamente' })
  remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id);
  }

  @Get(':id/permissions-structure')
  @ApiResponse({
    description:
      'Estructura completa de roles, permisos, módulos y aplicaciones',
  })
  async getRolePermissionsStructure(@Param('id') id: number): Promise<any> {
    return this.rolesService.getRolePermissionsStructure(id);
  }
}
