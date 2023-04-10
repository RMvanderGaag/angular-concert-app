import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { UserDocument } from '../user/user.schema';

describe('userController', () => {
    let app: TestingModule;
    let userController: UserController;
    let userService: UserService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: {
                    getAllUsers: jest.fn(),
                    getUserById: jest.fn(),
                },

            },
            {
                provide: AuthService,
                useValue: {
                    verifyToken: jest.fn(),
                },
            }],
        }).compile();

        userService = app.get<UserService>(UserService);
        userController = app.get<UserController>(UserController);

    });

    describe('get all users', () => {
        it('should return an array of users', async () => {
            const user = [{ id: '1', name: 'test', email: 'test@mail.com', city: 'test', birthday: new Date(), isAdmin: false }];
            jest.spyOn(userService, 'getAllUsers').mockImplementation(async () => user);

            const results = await userController.getAllUsers();

            expect(results).toBe(user);
            expect(results).toHaveLength(1);
            expect(results[0]).toHaveProperty('id', '1');
        });
    });

    describe('get single user', () => {
        it('should return one user', async () => {
            const user = { id: '1', name: 'test', email: 'test@mail.com', city: 'test', birthday: new Date(), isAdmin: false };
            jest.spyOn(userService, 'getUserById').mockImplementation(async () => user);

            const result = await userController.getUserById(user.id);

            expect(result).toHaveProperty('id', '1');
        });
    });
});