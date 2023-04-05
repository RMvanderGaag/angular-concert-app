import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Concert } from '../concert/concert.schema';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    birthday: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
