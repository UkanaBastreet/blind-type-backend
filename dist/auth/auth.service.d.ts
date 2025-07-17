import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: LoginDto): Promise<any>;
    registration(userDto: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
            createdAt: Date;
        };
    }>;
    getMe(): Promise<void>;
    private generateToken;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    validateToken(token: string): Promise<boolean>;
}
