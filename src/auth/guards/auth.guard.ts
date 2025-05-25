import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    if (request.session.userId) {
      console.log('request.session.userId');
      return true;
    }
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException();
      }
      // const user = this.jwtService.verify(token);
      // request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: error });
    }

    return false;
  }
}
