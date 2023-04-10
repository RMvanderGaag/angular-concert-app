import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Artist, ArtistDocument, ArtistSchema } from './artist.schema';

describe('artistSchema', () => {
    let mongoServer: MongoMemoryServer;
    let artistModel: Model<ArtistDocument>;

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
                MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
            ],
        }).compile();

        artistModel = app.get<Model<ArtistDocument>>(getModelToken(Artist.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('Does not have required fields', () => {
        const model = new artistModel();

        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
        expect(err.errors.genre).toBeInstanceOf(Error);
        expect(err.errors.birthday).toBeInstanceOf(Error);

    });
});