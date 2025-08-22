import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Company ID associated with the role', example: 1 })
  @IsInt()
  company_id: number;

  @ApiProperty({ description: 'Name of the role', example: 'Admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the role', example: 'Administrator role', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Array of permission IDs to assign to the role', example: [1, 2, 3], required: false })
  @IsArray()
  @IsOptional()
  permissionIds?: number[];
}
