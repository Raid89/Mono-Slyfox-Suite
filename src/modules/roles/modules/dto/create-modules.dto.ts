import { PickType } from "@nestjs/swagger";
import { ModulesDto } from "./modules.dto";

export class CreateModulesDto extends PickType(ModulesDto, [
  'application_id',
  'name',
  'description',
]) {}
