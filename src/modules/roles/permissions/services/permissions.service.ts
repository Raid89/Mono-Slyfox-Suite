import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../repositories/permissions.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreatePermissionsDto } from '../dto/create-permissions.dto';
import { UpdatePermissionsDto } from '../dto/update-permissions.dto';

@Injectable()
export class PermissionsService {

  constructor(
    private readonly repo: PermissionsRepository,
    private readonly logger: AppLogger
  ) {}

  async create(dto: CreatePermissionsDto) {
    try {
      this.logger.log(`Creando permiso ${dto.name}`);
      return await this.repo.create(dto);
    } catch (error) {

      if (error.code === 'P2002') {
        this.logger.warn(`Permiso con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Permiso con nombre ${dto.name} ya existe`);
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

  async update(id: number, dto: UpdatePermissionsDto) {
    try {
      this.logger.log(`Actualizando permiso ${dto.name}`);
      return await this.repo.update(id, dto);
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.warn(`Permiso con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Permiso con nombre ${dto.name} ya existe`);
      }
      throw error;
    }
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
