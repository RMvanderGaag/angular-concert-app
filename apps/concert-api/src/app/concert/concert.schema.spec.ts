import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Concert, ConcertDocument, ConcertSchema } from './concert.schema';

describe('concertSchema', () => {
    let mongoServer: MongoMemoryServer;
    let concertModel: Model<ConcertDocument>;

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
                MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
            ],
        }).compile();

        concertModel = app.get<Model<ConcertDocument>>(getModelToken(Concert.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('Does not have required fields', () => {
        const model = new concertModel();

        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
        expect(err.errors.location).toBeInstanceOf(Error);
        expect(err.errors.price).toBeInstanceOf(Error);
        expect(err.errors.date).toBeInstanceOf(Error);

    });
});