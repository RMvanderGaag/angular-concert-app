import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist/artist.schema';

import { AuthService } from './auth/auth.service';
import { Identity, IdentitySchema } from './auth/identity.schema';
import { concertController } from './concert/concert.controller';
import { Concert, ConcertSchema } from './concert/concert.schema';
import { ConcertService } from './concert/concert.service';
import { TicketController } from './ticket/ticket.controller';

import { Ticket } from './ticket/ticket.schema';
import { TicketSchema } from './ticket/ticket.schema';
import { TicketService } from './ticket/ticket.service';

import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Identity.name, schema: IdentitySchema },
            { name: Concert.name, schema: ConcertSchema },
            { name: Ticket.name, schema: TicketSchema },
            { name: Artist.name, schema: ArtistSchema }
        ]),
    ],
    controllers: [
        UserController,
        concertController,
        TicketController
    ],
    providers: [
        UserService,
        AuthService,
        ConcertService,
        TicketService
    ],
    exports: [UserService, ConcertService, TicketService],
})
export class DataModule { }
