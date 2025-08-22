import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsRepository } from './repositories/permissions.repository';
import { PrismaService } from '@slyfox-platform/prisma';
import { LoggerModule } from '@slyfox-platform/logger';

@Module({
  imports: [
    LoggerModule,
  ],
  controllers: [
    PermissionsController,
  ],
  providers: [PermissionsService, PermissionsRepository, PrismaService],
  exports: [PermissionsService, PermissionsRepository],
})
export class PermissionsModule {}
