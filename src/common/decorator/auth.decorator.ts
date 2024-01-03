import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthTokenInterface } from '../classes/interface';

export const Authentication = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthTokenInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request?.auth || {};
  },
);
