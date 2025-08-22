import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApplicationsService } from '../services/applications.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApplicationDto } from '../dto/application.dto';
import { prismaToDto } from '@common/utils/prisma-to-dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Post()
  @ApiBody({ type: CreateApplicationDto })
  async create(@Body() dto: CreateApplicationDto): Promise<ApplicationDto> {
    const app = await this.service.create(dto);
    return prismaToDto(ApplicationDto, app) as ApplicationDto;
  }

  @Get()
  @ApiResponse({ type: [ApplicationDto] })
  findAll(): ApplicationDto[] {
    const app = this.service.findAll();
    return prismaToDto(ApplicationDto, app) as ApplicationDto[];
  }

  @Get('modules')
  @ApiResponse({ type: [ApplicationDto] })
  findAllWithModules(): ApplicationDto[] {
    const application = this.service.findAllWithModules();
    return prismaToDto(ApplicationDto, application) as ApplicationDto[];
  }

  @Get('structure')
  @ApiResponse({
    description: 'Estructura completa de aplicaciones, módulos y permisos',
  })
  async getApplicationsStructure(): Promise<any> {
    const structure = await this.service.getApplicationsStructure();
    return structure;
  }

  @Get(':id')
  @ApiResponse({ type: ApplicationDto })
  findOne(@Param('id') id: string): ApplicationDto {
    const app = this.service.findOne(+id);
    return prismaToDto(ApplicationDto, app) as ApplicationDto;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ): ApplicationDto {
    const app = this.service.update(+id, dto);
    return prismaToDto(ApplicationDto, app) as ApplicationDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.service.remove(+id);
  }
}
