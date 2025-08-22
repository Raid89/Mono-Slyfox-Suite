import { ModulesWithExcludedDto } from "../../modules/dto/modules.dto";
export declare class ApplicationDto {
    id: number;
    name: string;
    created_at: string;
    modules: ModulesWithExcludedDto[];
}
