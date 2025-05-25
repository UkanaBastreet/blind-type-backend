import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Post('/register')
  registration(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.registration(req, dto);
  }
}
