import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString()
  username?: string;

  @ApiProperty()
  @IsString()
  password: string;
}
