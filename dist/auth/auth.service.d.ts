import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: LoginDto): Promise<string>;
    registration(userDto: LoginDto): Promise<string>;
    generateToken(user: User): string;
    validateUser(userDto: LoginDto): Promise<User>;
}
