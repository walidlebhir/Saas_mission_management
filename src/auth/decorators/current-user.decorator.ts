import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { SafeUser } from '../../users/user.service.js';

export const CurrentUser = createParamDecorator(
  (
    data: keyof SafeUser | undefined,
    ctx: ExecutionContext,
  ): SafeUser | SafeUser[keyof SafeUser] | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user: SafeUser }>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);