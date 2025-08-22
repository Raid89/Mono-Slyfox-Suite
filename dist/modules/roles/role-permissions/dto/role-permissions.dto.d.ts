export declare class RolePermissionsDto {
    id: number;
    role_id: number;
    permission_id: number;
}
export declare class RolePermissionsDetailDto {
    id: number;
    roles: {
        id: number;
        name: string;
        description?: string;
    };
    permissions: {
        id: number;
        name: string;
        description?: string;
    };
}
