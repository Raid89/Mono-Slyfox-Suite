import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { prismaToDto } from '@common/utils/prisma-to-dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';
import { PermissionsDto } from '../dto/permissions.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) { }

  @Post()
  @ApiBody({ type: CreatePermissionsDto })
  async create(@Body() dto: CreatePermissionsDto): Promise<PermissionsDto> {
    const module = await this.service.create(dto);
    return prismaToDto(PermissionsDto, module) as PermissionsDto;
  }

  @Get()
  @ApiResponse({ type: [PermissionsDto] })
  async findAll(): Promise<PermissionsDto[]> {
    const permissions = await this.service.findAll();
    return prismaToDto(PermissionsDto, permissions) as PermissionsDto[];
  }

  @Get(':id')
  @ApiResponse({ type: PermissionsDto })
  async findOne(@Param('id') id: string): Promise<PermissionsDto> {
    const module = await this.service.findOne(+id);
    return prismaToDto(PermissionsDto, module) as PermissionsDto;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionsDto): Promise<PermissionsDto> {
    const module = await this.service.update(+id, dto);
    return prismaToDto(PermissionsDto, module) as PermissionsDto;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(+id);
  }
}
