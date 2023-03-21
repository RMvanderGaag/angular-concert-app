import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
    @Prop({ default: uuid, required: true, unique: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    price: Date;

    @Prop({ default: false })
    eighteenPlus: boolean;

    @Prop({ required: true })
    concertImageURL: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
