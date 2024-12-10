import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Token {
    email: string;
    id: string;
}

export const InjectToken = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const token = request.headers['authorization']; 

        

        return token;
    },
);
