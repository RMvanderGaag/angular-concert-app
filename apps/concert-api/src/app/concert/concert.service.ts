import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../ticket/ticket.schema';

import { ConcertDocument, Concert } from './concert.schema';

import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class ConcertService {
    constructor(
        @InjectModel(Concert.name)
        private concertModel: Model<ConcertDocument>,
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>,
        private neo4jService: Neo4jService,
    ) { }


    async createConcert(concert: Concert): Promise<Concert> {
        const newConcert = new this.concertModel(concert);
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

    async getRecommendedConcerts(userId: string): Promise<Concert[]> {
        const concerts = [] as Concert[];

        const recommendedConcerts = await this.neo4jService.singleRead(`match(user:User { id: '${userId}' })-[:Bought]->()-[:BelongsTo]->(c:Concert)-[:PlayedAt]->()<-[:PlayedAt]-(otherConcert:Concert)
        RETURN otherConcert`);

        for (const concert of recommendedConcerts.records) {
            console.log(concert);
            const concertId = concert.get('otherConcert').properties['id'];
            const concertObject = await this.getConcert(concertId);
            concerts.push(concertObject);
        }

        return concerts;
    }

}
