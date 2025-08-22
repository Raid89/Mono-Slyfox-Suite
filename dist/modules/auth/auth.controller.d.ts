import type { Request } from 'express';
import { RegisterService } from './services/register.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
export declare class AuthController {
    private readonly registerService;
    private readonly authService;
    constructor(registerService: RegisterService, authService: AuthService);
    register(dto: any): Promise<{
        message: string;
    }>;
    confirm(token: string, res: any, req: any): Promise<any>;
    getMe(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        companyId: number;
        roles: string;
    }>;
    login(dto: LoginDto): Promise<{
        userId: number;
        email: string;
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    refreshTokens(userId: number, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
