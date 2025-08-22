import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import type { Request } from 'express';
import { RegisterCompanyAndUserDto } from './dto/register-company-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { RegisterService } from './services/register.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { GetCurrentUserId } from '@common/decorators/get-current-user-id.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  @ApiBody({ type: RegisterCompanyAndUserDto })
  @ApiOperation({ summary: 'Registro de empresa y usuario administrador' })
  @ApiResponse({ status: 201, description: 'Correo de verificación enviado' })
  register(@Body() dto: any) {
    console.log('Registering company and user:', JSON.stringify(dto));
    return this.registerService.register(dto);
  }

  @Get('confirm')
  @ApiOperation({ summary: 'Confirmar correo y activar cuenta' })
  async confirm(@Query('token') token: string, @Res() res, @Req() req) {
    const status = await this.registerService.confirm(token);
    const origin = process.env.FRONTEND_ORIGIN; // <-- Aquí obtienes el origin
    const url = `${origin || 'https://suite.slyfox.com.co'}/login?verify=${status ? 'true' : 'false'}`;
    return res.redirect(url);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener info del usuario autenticado' })
  getMe(@GetCurrentUserId() userId: number) {
    console.log(`User ID: ${userId}`);
    return this.authService.getCurrentUserInformation(userId);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, el accessToken tiene una duración de 10000ms' })
  @ApiResponse({ status: 403, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiHeader({ name: 'rf-token-session', description: 'Token de refresco para la sesión' })
  @ApiOperation({ summary: 'Refrescar tokens de acceso' })
  @ApiResponse({ status: 200, description: 'Tokens refrescados exitosamente' })
  @ApiResponse({ status: 403, description: 'Token de refresco inválido o expirado' })
  @ApiResponse({ status: 401, description: 'Token de refresco no proporcionado' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiOperation({ summary: 'Refrescar tokens de acceso' })
  @UseGuards(JwtAuthGuard)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @Req() req: Request,
  ) {
    const refreshToken = req.headers['rf-token-session'] as string;
    if (!refreshToken) {
      throw new ForbiddenException('Token de refresco no proporcionado');
    }
    return this.authService.refreshTokens(userId, refreshToken );
  }
}
