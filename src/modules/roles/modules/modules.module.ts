import { Module } from '@nestjs/common';
import { ModulesService } from './services/modules.service';
import { ModulesController } from './controllers/modules.controller';
import { ModulesRepository } from './repositories/modules.repository';
import { PrismaService } from '@slyfox-platform/prisma';
import { LoggerModule } from '@slyfox-platform/logger';

@Module({
  imports: [
    LoggerModule,
  ],
  controllers: [
    ModulesController,
  ],
  providers: [ModulesService, ModulesRepository, PrismaService],
  exports: [ModulesService, ModulesRepository],
})
export class ModulesModule {}
