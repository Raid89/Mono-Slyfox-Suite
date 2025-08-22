import { UsersRepository } from '../repositories/users.repository';
import { AppLogger } from '@slyfox-platform/logger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RolesRepository } from 'src/modules/roles/roles/repositories/roles.repository';
export declare class UsersService {
    private readonly usersRepository;
    private readonly logger;
    private readonly rolesRepository;
    constructor(usersRepository: UsersRepository, logger: AppLogger, rolesRepository: RolesRepository);
    getUsersPaginateByCompany(page: number, limit: number, companyId: any): Promise<{
        data: {
            name: string;
            email: string;
            document: string;
            roles: {
                name: string;
            };
            id: number;
            is_active: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        document: string;
        company_id: number | null;
        id: number;
        created_at: Date | null;
        role_id: number | null;
        password_hash: string;
        is_active: boolean | null;
        isEmailVerified: boolean;
        email_verification_token: string | null;
        hashedRt: string | null;
        currentJti: string | null;
    }>;
    getUserById(id: number): Promise<{
        roles: {
            name: string;
        };
    } & {
        name: string;
        email: string;
        document: string;
        company_id: number | null;
        id: number;
        created_at: Date | null;
        role_id: number | null;
        password_hash: string;
        is_active: boolean | null;
        isEmailVerified: boolean;
        email_verification_token: string | null;
        hashedRt: string | null;
        currentJti: string | null;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        document: string;
        company_id: number | null;
        id: number;
        created_at: Date | null;
        role_id: number | null;
        password_hash: string;
        is_active: boolean | null;
        isEmailVerified: boolean;
        email_verification_token: string | null;
        hashedRt: string | null;
        currentJti: string | null;
    }>;
    deleteUser(id: number): Promise<{
        name: string;
        email: string;
        document: string;
        company_id: number | null;
        id: number;
        created_at: Date | null;
        role_id: number | null;
        password_hash: string;
        is_active: boolean | null;
        isEmailVerified: boolean;
        email_verification_token: string | null;
        hashedRt: string | null;
        currentJti: string | null;
    }>;
}
