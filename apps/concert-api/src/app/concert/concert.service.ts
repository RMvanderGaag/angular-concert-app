import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../ticket/ticket.schema';

import { ConcertDocument, Concert } from './concert.schema';

@Injectable()
export class ConcertService {
    constructor(
        @InjectModel(Concert.name)
        private concertModel: Model<ConcertDocument>,
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>,
    ) { }


    async createConcert(concert: Concert): Promise<Concert> {
        // let artists: any = await this.artistService.getArtistsById(artistIds);
        // let artistMongoIds = artists.map((artist) => artist._id);
        // if (!this.artistService.checkArtistAvailability(artists, concert)) throw new HttpException('Artist already has a concert on this day', HttpStatus.BAD_REQUEST);

        const newConcert = new this.concertModel(concert);
        //this.artistService.bookArtists(artists, newConcert)
        return newConcert.save();
    }

    async getConcerts(): Promise<Concert[]> {
        return this.concertModel.find().populate('artists', 'name').exec();
    }

    async getConcert(id: string): Promise<Concert> {
        const concert = this.concertModel.findOne({ id: id }).populate('artists', 'name').exec();
        if (concert == null) {
            throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);
        }
        return concert;
    }

    async deleteConcert(id: string): Promise<Concert> {
        let concert = this.concertModel.findOneAndRemove({ id: id });
        if (concert == null) {
            throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);
        }
        return concert;
    }

    async updateConcert(id: string, concert: Concert): Promise<Concert> {
        return this.concertModel.findOneAndUpdate({ id: id }, concert, {
            new: true,
            runValidators: true,
        });
    }

    async deleteConcerts() {
        return this.concertModel.deleteMany({});
    }

    async getConcertTickets(id: string) {
        let a = this.ticketModel.find({ concert: id });
        console.log(a);
    }

}
