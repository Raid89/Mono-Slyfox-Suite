import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ModulesService } from '../services/modules.service';
import { prismaToDto } from '@common/utils/prisma-to-dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';
import { ModulesDto } from '../dto/modules.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly service: ModulesService) { }

  @Post()
  @ApiBody({ type: CreateModulesDto })
  async create(@Body() dto: CreateModulesDto): Promise<ModulesDto> {
    const module = await this.service.create(dto);
    return prismaToDto(ModulesDto, module) as ModulesDto;
  }

  @Get()
  @ApiResponse({ type: [ModulesDto] })
  async findAll(): Promise<ModulesDto[]> {
    const modules = await this.service.findAll();
    return prismaToDto(ModulesDto, modules) as ModulesDto[];
  }

  @Get(':id')
  @ApiResponse({ type: ModulesDto })
  async findOne(@Param('id') id: string): Promise<ModulesDto> {
    const module = await this.service.findOne(+id);
    return prismaToDto(ModulesDto, module) as ModulesDto;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateModulesDto): Promise<ModulesDto> {
    const module = await this.service.update(+id, dto);
    return prismaToDto(ModulesDto, module) as ModulesDto;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(+id);
  }
}
