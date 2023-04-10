import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true, validate: {
            validator: (v: string) => {
                return /([0-9]{4}[A-Z]{2})/.test(v);
            }, message: (props) => `${props.value} is not a valid postal code!`
        }
    })
    address: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({ required: true })
    city: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
