import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth/auth.service';
import { Identity, IdentitySchema } from './auth/identity.schema';

import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Identity.name, schema: IdentitySchema },
        ]),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        AuthService,
    ],
    exports: [UserService],
})
export class DataModule { }
