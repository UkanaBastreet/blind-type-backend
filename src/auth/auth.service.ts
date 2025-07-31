import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  public async login(userDto: LoginDto): Promise<any> {
    const user = await this.usersService.findByEmail(userDto.email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    const isMatch = await this.validatePassword(
      userDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
  public async registration(userDto: RegisterDto) {
    const candidate = await this.usersService.findByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashPassword = (await bcrypt.hash(userDto.password, 5)) as string;
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }
  public async getMe() {
    // const user = await this.usersService.getMe();
    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }
    // return {
    //   id: user.id,
    //   email: user.email,
    //   createdAt: user.createdAt,
    // };
  }
  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const token = this.jwtService.sign(payload);
    return token;
  }
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  async validateToken(token: string): Promise<boolean> {
    const decoded = this.jwtService.verify(token);
    const user = await this.usersService.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return true;
  }
  // async validateTokenOrThrow(token: string): Promise<boolean> {
  //   const decoded = this.jwtService.verify(token);
  //   const user = await this.usersService.findById(decoded.id);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }
  //   return true;
  // }
  // private saveTokenToCookie(res: Response, token: string): void {
  //   res.cookie('token', token, {
  //     maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //   });
  // }
  // private removeTokenFromCookie(res: Response): void {
  //   res.clearCookie('token', {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //   });
  // }
}
