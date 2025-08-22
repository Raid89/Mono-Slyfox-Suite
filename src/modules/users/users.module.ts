import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@slyfox-platform/prisma';
import { UsersRepository } from './repositories/users.repository';
import { LoggerModule } from '@slyfox-platform/logger';
import { RolesModule } from '../roles/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    LoggerModule,
    HttpModule,
    RolesModule
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersRepository,
    UsersService,
  ],
})
export class UsersModule { }
