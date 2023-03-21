import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertService } from 'libs/concert/src/lib/services/concert.service';

import { AuthService } from './auth/auth.service';
import { Identity, IdentitySchema } from './auth/identity.schema';
import { ConcertController } from './concert/concert.controller';
import { Concert, ConcertSchema } from './concert/concert.schema';

import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Identity.name, schema: IdentitySchema },
            { name: Concert.name, schema: ConcertSchema }
        ]),
    ],
    controllers: [
        UserController,
        ConcertController
    ],
    providers: [
        UserService,
        AuthService,
        ConcertService
    ],
    exports: [UserService],
})
export class DataModule { }
