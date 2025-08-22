import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  company_id: number;

  @ApiProperty({ example: 'Juan Perez' })
  name: string;

  @ApiProperty({ example: 'juan@email.com' })
  email: string;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '1234567890' })
  document: string;

  @ApiProperty({ example: false })
  isEmailVerified: boolean;

  @ApiProperty({ example: '2025-08-06T12:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: 2 })
  role_id: number;

  @ApiProperty({ example: null })
  email_verification_token: string | null;

  @ApiProperty({ example: null })
  hashedRt: string | null;
}
