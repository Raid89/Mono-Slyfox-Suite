import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 10, description: 'Id de la empresa' })
  @IsInt()
  @IsNotEmpty()
  company_id: number;

  @ApiProperty({ example: 'Juan Perez', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'juan@email.com', description: 'Email del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '1234567890', description: 'Documento de identidad' })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({ example: 2, description: 'Id del rol' })
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
