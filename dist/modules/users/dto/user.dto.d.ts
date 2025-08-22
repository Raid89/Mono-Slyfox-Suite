export declare class UserDto {
    id: number;
    company_id: number;
    name: string;
    email: string;
    is_active: boolean;
    document: string;
    isEmailVerified: boolean;
    created_at: Date;
    role_id: number;
    email_verification_token: string | null;
    hashedRt: string | null;
}
