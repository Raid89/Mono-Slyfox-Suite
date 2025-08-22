import { UsersService } from '../services/users.service';
import { GetUsersPaginateQueryDto } from '../dto/get-users.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsersPaginateByCompany(query: GetUsersPaginateQueryDto): Promise<{
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
