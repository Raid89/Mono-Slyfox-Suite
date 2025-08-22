import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { PrismaService } from '@slyfox-platform/prisma';
import { RolesRepository } from './repositories/roles.repository';
import { LoggerModule } from '@slyfox-platform/logger';
import { RolePermissionsRepository } from '../role-permissions/repositories/role-permissions.repository';
import { PermissionsRepository } from '../permissions/repositories/permissions.repository';
import { ModulesRepository } from '../modules/repositories/modules.repository';
import { ApplicationsRepository } from '../applications/repositories/applications.repository';

@Module({
  imports: [LoggerModule],
  controllers: [RolesController],
  providers: [RolesService, PrismaService, RolesRepository, RolePermissionsRepository, PermissionsRepository, ModulesRepository, ApplicationsRepository],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
