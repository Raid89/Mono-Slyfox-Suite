import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
  @ApiProperty({ description: 'ID del rol', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID de la compañía asociada', example: 1 })
  company_id: number;

  @ApiProperty({ description: 'Nombre del rol', example: 'Admin' })
  name: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Rol de administrador',
    required: false,
  })
  description?: string;
}
