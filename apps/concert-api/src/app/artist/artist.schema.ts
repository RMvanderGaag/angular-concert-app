import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Concert } from '../concert/concert.schema';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop({ default: uuid, required: true, unique: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    birthday: Date;

    @Prop({ required: true })
    country: string

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Concert' }]})
    concerts?: Concert[];

    @Prop({ required: false })
    image?: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
