import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: LoginDto): Promise<string>;
    registration(req: Request, userDto: LoginDto): Promise<unknown>;
    generateToken(user: User): string;
    validateUser(userDto: LoginDto): Promise<User>;
    private saveSession;
}
