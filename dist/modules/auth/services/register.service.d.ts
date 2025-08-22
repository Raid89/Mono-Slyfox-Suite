import { PrismaService } from '@slyfox-platform/prisma';
import { EmailService } from '@libs/email/email.service';
import { AppLogger } from '@slyfox-platform/logger';
import { RegisterCompanyAndUserDto } from '../dto/register-company-user.dto';
import { RolesService } from '../../roles/roles/services/roles.service';
export declare class RegisterService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    private readonly rolesService;
    constructor(prisma: PrismaService, emailService: EmailService, logger: AppLogger, rolesService: RolesService);
    register(dto: RegisterCompanyAndUserDto): Promise<{
        message: string;
    }>;
    confirm(token: string): Promise<boolean>;
    getMe(user: {
        email: string;
    }): Promise<{
        email: string;
    }>;
    private createOwnerRole;
}
