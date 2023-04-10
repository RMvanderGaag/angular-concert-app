import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Location, LocationDocument, LocationSchema } from './location.schema';

describe('LocationSchema', () => {
    let mongoServer: MongoMemoryServer;
    let locationModel: Model<LocationDocument>;

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
                MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
            ],
        }).compile();

        locationModel = app.get<Model<LocationDocument>>(getModelToken(Location.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('Does not have required fields', () => {
        const model = new locationModel();

        const err = model.validateSync();

        expect(err.errors.name).toBeInstanceOf(Error);
        expect(err.errors.address).toBeInstanceOf(Error);
        expect(err.errors.capacity).toBeInstanceOf(Error);
        expect(err.errors.city).toBeInstanceOf(Error);
    });

    it('Has required fields', () => {
        const model = new locationModel({
            name: 'test',
            address: '2954CA',
            capacity: 100,
            city: 'test',
        });

        const err = model.validateSync();

        expect(err).toBeUndefined();
    });

    it('Has invalid postal code', () => {
        const model = new locationModel({
            name: 'test',
            address: '2954 AAA',
            capacity: 100,
            city: 'test',
        });

        const err = model.validateSync();

        expect(err.errors.address).toBeInstanceOf(Error);
    });

});