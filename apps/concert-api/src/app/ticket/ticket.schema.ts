import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Concert } from '../concert/concert.schema';
import { User } from '../user/user.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
    @Prop({ default: uuid, required: true, unique: true })
    id: string;

    @Prop({ default: new Date(), required: true })
    buyDate: Date;

    @Prop({ required: true })
    seatNumber: number;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Concert' })
    concert: Concert;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
