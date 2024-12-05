import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ArtistDocument, Artist } from './artist.schema';


@Injectable()
export class ArtistService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>
    ) { }


    async createArtist(artist: Artist): Promise<Artist> {
        const newArtist = new this.artistModel(artist);
        return newArtist.save();
    }

    async getArtists(): Promise<Artist[]> {
        return this.artistModel.find().populate('concerts', 'name').exec();
    }

    async getArtist(id: string): Promise<Artist> {
        const artist = this.artistModel.findOne({ id: id }).populate('concerts', 'name').exec();
        console.log(artist);
        if (artist == null) {
            throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
        }
        return artist;
    }

    async deleteArtist(id: string): Promise<Artist> {
        let existingArtist = await this.artistModel.findOne({id: id});
        if (existingArtist == null) {
            throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
        }

        if(existingArtist.concerts && existingArtist.concerts.length > 0){
            throw new HttpException(
                'Cannot delete artist because they are linked to one or more concerts',
                HttpStatus.BAD_REQUEST,
              );
        }

        return this.artistModel.findOneAndRemove({id: id});
    }

    async updateArtist(id: string, artist: Artist): Promise<Artist> {
        let existingArtist = await this.artistModel.findOne({id: id});
        if (existingArtist == null) {
            throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
        }

        if(existingArtist.concerts && existingArtist.concerts.length > 0){
            throw new HttpException(
                'Cannot update artist because they are linked to one or more concerts',
                HttpStatus.BAD_REQUEST,
              );
        }

        return this.artistModel.findOneAndUpdate({id: id}, artist, {new: true, runValidators: true});
    }

    async deleteArtists() {
        return this.artistModel.deleteMany({});
    }
}
