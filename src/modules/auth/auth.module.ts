import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '@slyfox-platform/prisma';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from '@libs/email/email.service';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { LoggerModule } from '@slyfox-platform/logger';
import { RegisterService } from './services/register.service';
import { AuthService } from './services/auth.service';
import { JwtRefreshStrategy } from '@common/strategies/refresh-token.strategy';
import { RolesModule } from '../roles/roles/roles.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      },
    }),
    LoggerModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterService,
    PrismaService,
    EmailService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
