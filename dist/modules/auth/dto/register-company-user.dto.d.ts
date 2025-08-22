export declare class RegisterCompanyDto {
    name: string;
    email: string;
    nit: string;
    address: string;
    phone: string;
}
export declare class RegisterUserDto {
    fullName: string;
    email: string;
    document: string;
    password: string;
}
export declare class RegisterCompanyAndUserDto {
    company: RegisterCompanyDto;
    user: RegisterUserDto;
}
