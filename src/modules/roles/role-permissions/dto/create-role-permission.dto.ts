import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty({ description: 'Role ID' })
  @IsInt()
  @Expose()
  role_id: number;

  @ApiProperty({ description: 'Permission ID' })
  @IsInt()
  @Expose()
  permission_id: number;
}
