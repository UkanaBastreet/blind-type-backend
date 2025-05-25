import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async registration(req: Request, userDto: LoginDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = (await bcrypt.hash(userDto.password, 5)) as string;

    const user = await this.usersService
      .create({
        ...userDto,
        password: hashPassword,
      })
      .then((res) => res.raw);

    // return this.generateToken(user);
    return this.saveSession(req, user);
  }
  generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const token = this.jwtService.sign(payload);
    return JSON.stringify({
      token,
    });
  }
  async validateUser(userDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new NotFoundException('User with that email is not found');
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Invalid email or password',
    });
  }
  private async saveSession(req: Request, user: User) {
    return new Promise((res, rej) => {
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          rej(err);
        }
        res(user);
      });
    });
  }
}
