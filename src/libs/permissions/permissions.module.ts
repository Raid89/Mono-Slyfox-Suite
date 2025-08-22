import { Global, Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@slyfox-platform/prisma';

@Global()
@Module({
  providers: [PermissionsService, PermissionsGuard, Reflector, PrismaService],
  exports: [PermissionsService, PermissionsGuard],
})
export class PermissionsValidationModule {}
