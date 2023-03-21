import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Concert, ConcertDocument } from './concert.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('Concert') private concertModel: Model<ConcertDocument>,
    ) { }

    async createConcert(concert: Concert): Promise<Concert> {
        const createdConcert = new this.concertModel(concert);
        return createdConcert.save();
    }
}
