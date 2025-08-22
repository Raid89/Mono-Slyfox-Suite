import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MainRolesModule } from './modules/roles/main-roles.module';
import { PermissionsGuard } from '@libs/permissions';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsValidationModule } from '@libs/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    MainRolesModule,
    PermissionsValidationModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
