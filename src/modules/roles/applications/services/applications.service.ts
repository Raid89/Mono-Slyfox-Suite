import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationsRepository } from '../repositories/applications.repository';
import { ModulesRepository } from '../../modules/repositories/modules.repository';
import { PermissionsRepository } from '../../permissions/repositories/permissions.repository';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { AppLogger } from '@slyfox-platform/logger';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly repo: ApplicationsRepository,
    private readonly modulesRepo: ModulesRepository,
    private readonly permissionsRepo: PermissionsRepository,
    private readonly logger: AppLogger
  ) {}

  create(dto: CreateApplicationDto) {
    try {
      this.logger.log(`Creando aplicación ${dto.name}`);
      return this.repo.create(dto);
    } catch (error) {

      if (error.code === 'P2002') {
        this.logger.warn(`Aplicación con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Aplicación con nombre ${dto.name} ya existe`);
      }

      throw error;
    }
  }

  findAll() {
    this.logger.log('Obteniendo todas las aplicaciones');
    return this.repo.findAll();
  }

  findOne(id: number) {
    this.logger.log(`Obteniendo aplicación con ID ${id}`);
    return this.repo.findOne(id);
  }

  findAllWithModules() {
    this.logger.log('Obteniendo todas las aplicaciones con módulos');
    return this.repo.findAllWithModules();
  }

  update(id: number, dto: UpdateApplicationDto) {
    try {
      this.logger.log(`Actualizando aplicación ${dto.name}`);
      return this.repo.update(id, dto);
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.warn(`Aplicación con nombre ${dto.name} ya existe`);
        throw new BadRequestException(`Aplicación con nombre ${dto.name} ya existe`);
      }
      throw error;
    }
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  async getApplicationsStructure(): Promise<any> {
    try {
      this.logger.log('Obteniendo estructura completa de aplicaciones, módulos y permisos');

      const applications = await this.repo.findAllWithModules();

      const structure = await Promise.all(
        applications.map(async (app) => {
          const modules = await this.modulesRepo.findAll();

          const modulesWithPermissions = await Promise.all(
            modules.map(async (module) => {
              const permissions = await this.permissionsRepo.findAll();
              return {
                ...module,
                permissions,
              };
            })
          );

          return {
            ...app,
            modules: modulesWithPermissions,
          };
        })
      );

      return structure;
    } catch (error) {
      this.logger.error(`Error obteniendo estructura de aplicaciones: ${error.message}`);
      throw error;
    }
  }
}
