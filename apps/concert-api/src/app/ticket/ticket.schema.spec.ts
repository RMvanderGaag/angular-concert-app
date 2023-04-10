import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Ticket, TicketDocument, TicketSchema } from './ticket.schema';

describe('ticketSchema', () => {
    let mongoServer: MongoMemoryServer;
    let ticketModel: Model<TicketDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongoServer = await MongoMemoryServer.create();
                        const uri = await mongoServer.getUri();
                        return { uri }
                    }
                }),
                MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
            ],
        }).compile();

        ticketModel = app.get<Model<TicketDocument>>(getModelToken(Ticket.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('Does not have required fields', () => {
        const model = new ticketModel();

        const err = model.validateSync();

        expect(err.errors.concert).toBeInstanceOf(Error);
        expect(err.errors.seatNumber).toBeInstanceOf(Error);
        expect(err.errors.user).toBeInstanceOf(Error);

    });
});