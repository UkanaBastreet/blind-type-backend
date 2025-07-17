import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './roles.decorator';
import { RoleGuard } from '../guards/role.guard';

export function Authorize(roles: string[]) {
  if (roles.length !== 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
  }
  return applyDecorators(UseGuards(AuthGuard));
}
