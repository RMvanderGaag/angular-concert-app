import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ default: uuid, required: true, unique: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
