import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail, MinLength, IsInt, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Juan Actualizado', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'nuevo@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'nuevaPassword123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  role_id?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
