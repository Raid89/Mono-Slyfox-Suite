import { ApiProperty } from '@nestjs/swagger';
import { RolesDto } from '../../roles/dto/roles.dto';
import { PermissionsDto } from '../../permissions/dto/permissions.dto';

export class RolePermissionsDto {
  @ApiProperty({ description: 'Role Permission ID' })
  id: number;

  @ApiProperty({ description: 'Role ID' })
  role_id: number;

  @ApiProperty({ description: 'Permission ID' })
  permission_id: number;
}


export class RolePermissionsDetailDto {
  @ApiProperty({ description: 'Role Permission ID' })
  id: number;

  @ApiProperty({ description: 'Role details', type: RolesDto })
  roles: { id: number; name: string; description?: string };

  @ApiProperty({ description: 'Permission details', type: PermissionsDto })
  permissions: { id: number; name: string; description?: string };

}
