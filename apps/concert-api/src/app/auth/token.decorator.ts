import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export interface Token {
    email: string;
    id: string;
}

export const InjectToken = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const jwt = request['headers'].authorization;

		return jwtDecode(jwt);
	}
);
