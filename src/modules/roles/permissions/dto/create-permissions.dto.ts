import { PickType } from "@nestjs/swagger";
import { PermissionsDto } from "./permissions.dto";

export class CreatePermissionsDto extends PickType(PermissionsDto, [
  'module_id',
  'name',
  'description',
]) {}
