import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  @Min(6)
  @Max(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['admin', 'user'])
  role: string;
}
