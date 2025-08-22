export declare class ModulesDto {
    id: number;
    application_id: number;
    name: string;
    description: string;
    created_at: string;
}
declare const ModulesWithExcludedDto_base: import("@nestjs/common").Type<Pick<ModulesDto, "description" | "name" | "id">>;
export declare class ModulesWithExcludedDto extends ModulesWithExcludedDto_base {
}
export {};
