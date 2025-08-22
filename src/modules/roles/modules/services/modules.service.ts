import { BadRequestException, Injectable } from '@nestjs/common';
import { ModulesRepository } from '../repositories/modules.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreateModulesDto } from '../dto/create-modules.dto';
import { UpdateModulesDto } from '../dto/update-modules.dto';

@Injectable()
export class ModulesService {

  constructor(
    private readonly repo: ModulesRepository,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreateModulesDto) {
    try {
      this.logger.log(`Creando módulo ${dto.name}`);
      return await this.repo.create(dto);
    } catch (error) {

      if (error.code === 'P2002') {
        this.logger.warn(`Módulo con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Módulo con nombre ${dto.name} ya existe`);
      }

      throw error;
    }
  }

  async findAll() {
    return await this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, dto: UpdateModulesDto) {
    try {
      this.logger.log(`Actualizando módulo ${dto.name}`);
      return await this.repo.update(id, dto);
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.warn(`Módulo con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Módulo con nombre ${dto.name} ya existe`);
      }
      throw error;
    }
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
