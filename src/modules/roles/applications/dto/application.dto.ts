import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ModulesWithExcludedDto } from "../../modules/dto/modules.dto";

export class ApplicationDto {
  @ApiProperty({
    description: 'Unique identifier for the application',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Name of the application',
    example: 'My Application',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Creation date of the application',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  created_at: string;

  @ApiProperty({
    description: 'Modules related to the application',
    type: [ModulesWithExcludedDto],
    example: [{ id: 1, name: 'Module1', description: 'Description1' }, { id: 2, name: 'Module2', description: 'Description2' }],
  })
  @Expose()
  modules: ModulesWithExcludedDto[];
}
