import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private readonly authService;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
