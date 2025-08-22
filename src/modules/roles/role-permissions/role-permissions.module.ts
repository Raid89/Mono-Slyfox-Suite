import { Module } from '@nestjs/common';
import { RolePermissionsService } from './services/role-permissions.service';
import { RolePermissionsController } from './controllers/role-permissions.controller';
import { RolePermissionsRepository } from './repositories/role-permissions.repository';
import { LoggerModule } from '@slyfox-platform/logger';
import { PrismaService } from '@slyfox-platform/prisma';
import { PermissionsService } from '@slyfox-platform/permissions';

@Module({
  imports: [LoggerModule],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService, RolePermissionsRepository, PrismaService, PermissionsService],
  exports: [RolePermissionsService, RolePermissionsRepository],
})
export class RolePermissionsModule {}
