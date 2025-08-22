import { ApiProperty, PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ModulesDto {
 @ApiProperty({
    description: 'Unique identifier for the module',
    example: 1,
  })
  @Expose()
  id: number;

 @ApiProperty({
    description: 'Unique identifier for the module',
    example: 1,
  })
  @Expose()
  @IsNotEmpty()
  application_id: number;

  @ApiProperty({
    description: 'Name of the module',
    example: 'My Module',
  })
  @Expose()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the module',
    example: 'This is my module',
  })
  @Expose()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Creation date of the module',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  created_at: string;
}

export class ModulesWithExcludedDto extends PickType(ModulesDto, [
  'id',
  'name',
  'description',
]) {}
