import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<any>;
    registration(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            role: import("../users/types/role-enum.type").RoleEnum;
            createdAt: Date;
        };
    }>;
    getMe(): Promise<void>;
}
