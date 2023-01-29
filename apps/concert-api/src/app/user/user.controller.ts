import {
    Controller,
    Get,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('info')
    async getUserInfo(@InjectToken() token: Token): Promise<User> {
        return await this.userService.getUserInfo(token.id);
    }
}
