import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../ticket/ticket.schema';

import { ConcertDocument, Concert } from './concert.schema';

import { Neo4jService } from '../neo4j/neo4j.service';
import { Artist, ArtistDocument } from '../artist/artist.schema';

@Injectable()
export class ConcertService {
    constructor(
        @InjectModel(Concert.name)
        private concertModel: Model<ConcertDocument>,
        @InjectModel(Ticket.name)
        private ticketModel: Model<TicketDocument>,
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>
        // private neo4jService: Neo4jService,
    ) { }


    async createConcert(concert: Concert): Promise<Concert> {
        const newConcert = new this.concertModel(concert);
        await newConcert.save();

        if(concert.artists && concert.artists.length > 0){
            await this.artistModel.updateMany(
                {
                    _id: {$in: concert.artists}
                },
                {
                    $addToSet: {concerts: newConcert._id}
                }
            )
        }

        return newConcert.populate('artists')
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
        const concert = await this.concertModel.findOne({id: id}).populate('artists').exec();
        if (!concert) {
            throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);
        }

        await this.artistModel.updateMany(
            { _id: { $in: concert.artists.map((artist: any) => artist._id) } }, 
            { $pull: { concerts: concert._id } }
        );

        return this.concertModel.findOneAndDelete({id: id}).exec();
    }

    async updateConcert(id: string, concert: Concert): Promise<Concert> {
        const c = await this.concertModel.findOne({id: id}).populate('artists').exec();
        if(!c) throw new HttpException('Concert not found', HttpStatus.NOT_FOUND);

        const currentArtistIds = c.artists.map((artist: any) => artist._id.toString());
        const newArtistIds = concert.artists || [];

        const artistsToAdd = newArtistIds.filter(id => !currentArtistIds.includes(id));
        const artistsToRemove = currentArtistIds.filter(id => !newArtistIds.includes(id));

        await this.artistModel.updateMany(
            { _id: { $in: artistsToAdd } },
            { $addToSet: { concerts: c._id } }
        )

        await this.artistModel.updateMany(
            { _id: { $in:  artistsToRemove} },
            { $pull: { concerts: c._id } }
        )

        const updatedConcert = await this.concertModel.findOneAndUpdate({id: id}, { ...concert, artists: newArtistIds }, {new: true, runValidators: true})
        return updatedConcert;

    }

    async deleteConcerts() {
        return this.concertModel.deleteMany({});
    }

    // async getRecommendedConcerts(userId: string): Promise<Concert[]> {
    //     const concerts = [] as Concert[];

    //     const recommendedConcerts = await this.neo4jService.singleRead(`match(user:User { id: '${userId}' })-[:Bought]->()-[:BelongsTo]->(c:Concert)-[:PlayedAt]->()<-[:PlayedAt]-(otherConcert:Concert)
    //     RETURN otherConcert`);

    //     for (const concert of recommendedConcerts.records) {
    //         console.log(concert);
    //         const concertId = concert.get('otherConcert').properties['id'];
    //         const concertObject = await this.getConcert(concertId);
    //         concerts.push(concertObject);
    //     }

    //     return concerts;
    // }

}
