import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Concert } from '../concert/concert.schema';
import { ConcertService } from '../concert/concert.service';
import { UserService } from '../user/user.service';

import { Ticket, TicketDocument } from './ticket.schema';

@Injectable()
export class TicketService {
    constructor(
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>,
        private readonly concertService: ConcertService,
        private readonly userService: UserService,
    ) { }

    async createTicket(ticket: Ticket, userId: string, concertId: string): Promise<Ticket> {
        let concert = await this.concertService.getConcert(concertId);
        let user = await this.userService.getUserInfo(userId);

        const newTicket = new this.ticketModel({ ...ticket, concert: concert, user: user });
        return newTicket.save();
    }

    async getTickets(): Promise<Ticket[]> {
        return this.ticketModel.find().exec();
    }

    async getTicketsByConcertId(concert: Concert): Promise<Ticket[]> {
        return this.ticketModel.find({ concert: concert }).exec();
    }

    async deleteTicketById(id: string): Promise<Ticket> {
        return this.ticketModel.findOneAndRemove({ id: id }).exec();
    }
}
