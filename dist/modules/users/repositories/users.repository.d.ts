import { PrismaService } from '@slyfox-platform/prisma';
export declare class UsersRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUsersPaginateByCompany(skip: number, limit: number, companyId: number): Promise<{
        name: string;
        email: string;
        document: string;
        roles: {
            name: string;
        };
        id: number;
        is_active: boolean;
    }[]>;
    countUsersByCompany(companyId: number): Promise<number>;
    createUser(createUserDto: any): Promise<{
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
    findUserById(id: number): Promise<{
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
    updateUser(id: number, updateUserDto: any): Promise<{
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
