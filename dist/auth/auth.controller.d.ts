import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<string>;
    registration(userDto: CreateUserDto): Promise<string>;
}
