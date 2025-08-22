import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterCompanyDto {
  @ApiProperty({ example: 'SlyFox S.A.S.' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ example: 'contacto@slyfox.com.co' })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789-04' })
  @Expose()
  @IsString()
  nit: string;

  @ApiProperty({ example: 'Calle 123 #45-67 Bogotá' })
  @Expose()
  @IsString()
  address: string;

  @ApiProperty({ example: '3101234567' })
  @Expose()
  @IsString()
  phone: string;
}

export class RegisterUserDto {
  @ApiProperty({ example: 'SlyFox S.A.S.' })
  @Expose()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'contacto@slyfox.com.co' })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789-04' })
  @Expose()
  @IsString()
  document: string;

  @ApiProperty({ example: 'Slyfox123*' })
  @Expose()
  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterCompanyAndUserDto {
  @ApiProperty({ type: RegisterCompanyDto })
  @Expose()
  company: RegisterCompanyDto;

  @ApiProperty({ type: RegisterUserDto })
  @Expose()
  user: RegisterUserDto;
}
