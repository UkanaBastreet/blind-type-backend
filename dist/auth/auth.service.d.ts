import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<string>;
    registration(userDto: CreateUserDto): Promise<string>;
    generateToken(user: User): string;
    validateUser(userDto: CreateUserDto): Promise<User>;
}
