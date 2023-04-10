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
        let concert: any = await this.concertService.getConcert(concertId);
        let user = await this.userService.getUserInfo(userId);

        let concertCapacity = concert.location.capacity;
        let ticketsBought = (await this.getTicketsByConcertId(concertId)).length;
        if (ticketsBought >= concertCapacity) throw new HttpException('Concert is sold out', HttpStatus.BAD_REQUEST);

        const newTicket = new this.ticketModel({ ...ticket, concert: concert, user: user });
        return newTicket.save();
    }

    async getTickets(): Promise<Ticket[]> {
        return this.ticketModel.find().populate('concert').exec();
    }

    async getTicketsByConcertId(concertId: string): Promise<Ticket[]> {
        let concert: any = await this.concertService.getConcert(concertId);
        return this.ticketModel.find({ concert: concert._id }).exec();
    }

    async deleteTicketById(id: string): Promise<Ticket> {
        return this.ticketModel.findOneAndRemove({ id: id }).exec();
    }

    async getTicketsByUserId(userId: string): Promise<Ticket[]> {
        let user: any = await this.userService.getUserInfo(userId);
        return this.ticketModel.find({ user: user._id }).populate('concert').exec();
    }
}
