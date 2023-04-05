import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { Artist, ArtistDocument, ArtistSchema } from '../artist/artist.schema';
import { LocationSchema } from '../location/location.schema';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
    @Prop({ default: uuid, required: true, unique: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: [ArtistSchema] })
    artists: Artist[];

    @Prop({ required: true, type: [LocationSchema] })
    location: Location;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    date: Date;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
