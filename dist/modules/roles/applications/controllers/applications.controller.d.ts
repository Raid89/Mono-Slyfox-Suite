import { ApplicationsService } from '../services/applications.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationDto } from '../dto/application.dto';
export declare class ApplicationsController {
    private readonly service;
    constructor(service: ApplicationsService);
    create(dto: CreateApplicationDto): Promise<ApplicationDto>;
    findAll(): ApplicationDto[];
    findAllWithModules(): ApplicationDto[];
    getApplicationsStructure(): Promise<any>;
    findOne(id: string): ApplicationDto;
    update(id: string, dto: UpdateApplicationDto): ApplicationDto;
    remove(id: string): void;
}
