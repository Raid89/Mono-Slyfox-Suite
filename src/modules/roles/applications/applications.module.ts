import { Module } from '@nestjs/common';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsController } from './controllers/applications.controller';
import { ApplicationsRepository } from './repositories/applications.repository';
import { PrismaService } from '@slyfox-platform/prisma';
import { LoggerModule } from '@slyfox-platform/logger';
import { ModulesRepository } from '../modules/repositories/modules.repository';
import { PermissionsRepository } from '../permissions/repositories/permissions.repository';

@Module({
  imports: [
    LoggerModule,
  ],
  controllers: [
    ApplicationsController,
  ],
  providers: [
    ApplicationsService,
    ApplicationsRepository,
    PrismaService,
    ModulesRepository,
    PermissionsRepository,
  ],
  exports: [
    ApplicationsService,
    ApplicationsRepository,
  ],
})
export class ApplicationsModule {}
