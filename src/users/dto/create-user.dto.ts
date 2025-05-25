import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
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
}
