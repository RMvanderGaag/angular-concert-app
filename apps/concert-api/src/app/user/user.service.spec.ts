import { Test } from '@nestjs/testing';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { MongoClient } from 'mongodb'

import { UserService } from './user.service';
import { User, UserDocument, UserSchema } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { Identity, IdentityDocument, IdentitySchema } from '../auth/identity.schema';

describe('UserService', () => {
    let service: UserService;
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;

    let userModel: Model<UserDocument>;
    let identityModel: Model<IdentityDocument>;

    const testUsers = [
        { id: '1', name: 'test', email: 'test@mail.com', city: 'test', birthday: new Date(), isAdmin: false },
        { id: '2', name: 'test1', email: 'test1@mail.com', city: 'test', birthday: new Date(), isAdmin: false },
        { id: '3', name: 'test2', email: 'test2@mail.com', city: 'test', birthday: new Date(), isAdmin: false },
    ];

    beforeAll(async () => {
        let uri: string;

        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        uri = mongod.getUri();
                        return { uri };
                    },
                }),
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Identity.name, schema: IdentitySchema }]),

            ],
            providers: [UserService,
                {
                    provide: AuthService,
                    useValue: {
                        verifyToken: jest.fn(),
                    },
                }],
        }).compile();

        service = app.get<UserService>(UserService);
        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
        identityModel = app.get<Model<IdentityDocument>>(getModelToken(Identity.name));

        await userModel.ensureIndexes();

        mongoc = new MongoClient(uri);
        await mongoc.connect();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('users').deleteMany({});

        const user = new userModel(testUsers[0]);
        const user1 = new userModel(testUsers[1]);
        const user2 = new userModel(testUsers[2]);

        await Promise.all([user.save(), user1.save(), user2.save()]);
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('get all users', () => {
        it('should return an array of users', async () => {
            const results = await service.getAllUsers();
            expect(results).toHaveLength(3);
            expect(results.map(r => r.name)).toContain('test');
            expect(results.map(r => r.name)).toContain('test1');
            expect(results.map(r => r.name)).toContain('test2');
        });
    })

    describe('get user by id', () => {
        it('should return one user', async () => {
            const result = await service.getUserById('1');
            expect(result).toHaveProperty('id', '1');

        });

        it('should return undefined if user does not exist', async () => {
            const result = await service.getUserById('4');
            expect(result).toBeNull();
        });
    })

    describe('edit user', () => {
        it('should edit a existing user', async () => {
            const editedUser = testUsers[0];
            editedUser.name = 'test3';

            const result = await service.editUserById('1', editedUser);
            expect(result).toHaveProperty('name', 'test3');
        });
    })
});