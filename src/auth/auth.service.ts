import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    console.log('hashPassword: ', hashPassword);

    const user = await this.usersService
      .create({
        ...userDto,
        password: hashPassword,
      })
      .then((res) => res.raw);

    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const token = this.jwtService.sign(payload);
    return JSON.stringify({
      token,
    });
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new NotFoundException('User with that email is not found');
    }
    console.log('userDto: ', userDto);
    console.log('user: ', user);

    console.log(userDto.password, user.password);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    console.log('passwordEquals: ', passwordEquals);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }
}
