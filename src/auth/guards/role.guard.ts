import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest() as Request;
    if (request.session.userId) {
      throw new UnauthorizedException('User is not authenticated');
    }
    const user = await this.userRepository.findOne({
      where: { id: request.session.userId },
    });
    if (requiredRoles.includes(user.role)) {
      return true;
    }
    throw new ForbiddenException('Access denied');
  }
}
