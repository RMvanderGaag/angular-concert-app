import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { Ticket } from '../ticket/ticket.schema';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @Get('info')
    async getUserInfo(@InjectToken() token: Token): Promise<User> {
        console.log(token);
        return await this.userService.getUserInfo(token.id);
    }

    @Get(':id')
    async getUserById(
        @Param('id') userId: string,
    ): Promise<User> {
        return await this.userService.getUserById(userId);
    }

    @Put(':id')
    async editUserById(
        @Param('id') id: string,
        @Body() user: User,
    ): Promise<User> {
        try {
            return await this.userService.editUserById(id, user);
        } catch (e) {
            throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id') idToBeDeleted: string
    ): Promise<User> {
        return await this.userService.deleteIdentityByIdAndUserById(idToBeDeleted);
    }
}
