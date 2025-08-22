import { ApiProperty, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class PermissionsDto {
 @ApiProperty({
    description: 'Unique identifier for the permission',
    example: 1,
  })
  @Expose()
  id: number;

 @ApiProperty({
    description: 'Unique identifier for the permission',
    example: 1,
  })
  @Expose()
  @IsNotEmpty()
  module_id: number;

  @ApiProperty({
    description: 'Name of the permission',
    example: 'My Permissions',
  })
  @Expose()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the permission',
    example: 'This is my permission',
  })
  @Expose()
  @IsNotEmpty()
  description: string;
}
