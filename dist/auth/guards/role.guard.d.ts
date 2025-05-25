import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private readonly userRepository;
    constructor(reflector: Reflector, userRepository: Repository<User>);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
