import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@slyfox-platform/prisma';
import { LoginDto } from '../dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        userId: number;
        email: string;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userId: number, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    private generateTokens;
    private storeRefreshToken;
    getCurrentUserInformation(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        companyId: number;
        roles: string;
    }>;
}
