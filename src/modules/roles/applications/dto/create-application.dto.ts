import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Name of the application',
    example: 'SlyFox Platform',
    required: true,
  })
  @IsString()
  @Length(3, 100)
  name: string;
}
