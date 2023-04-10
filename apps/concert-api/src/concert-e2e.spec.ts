import request = require('supertest');

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from "mongoose";

import { AuthModule } from './app/auth/auth.module';
import { DataModule } from './app/data.module';
import { TokenMiddleware } from './app/auth/token.middleware';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { UserRegistration } from './app/auth/auth.model';
import { Neo4jModule } from './app/neo4j/neo4j.module';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        Neo4jModule.forRoot({
            scheme: 'neo4j',
            host: process.env.NEO4J_HOST,
            username: process.env.NEO4J_USR,
            password: process.env.NEO4J_PWD,
            database: process.env.NEO4J_DB,
        }),
        AuthModule,
        DataModule,
        RouterModule.register([
            {
                path: 'auth',
                module: AuthModule,
            },
            {
                path: 'data',
                module: DataModule,
            }
        ]),
    ],
    controllers: [],
    providers: [],
})
export class TestAppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes('data');
    }
}

describe('Concert API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('users').deleteMany({});
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('single user', () => {
        let credentails: UserRegistration;

        beforeEach(async () => {
            credentails = {
                email: 'test@mail.com',
                password: 'test',
                name: 'test',
                city: 'test',
                birthday: new Date(),
            }
        });

        it('should register user', async () => {
            const res = await request(server).post('/auth/register').send(credentails);
            expect(res.status).toBe(201);
            expect(res.body.id).toBeDefined();

            const login = await request(server).post('/auth/login').send({ email: credentails.email, password: credentails.password });
            expect(login.status).toBe(201);
            expect(login.body.token).toBeDefined();
        });

        it('should not log in user with wrong password', async () => {
            await request(server).post('/auth/register').send(credentails);

            const login = await request(server).post('/auth/login').send({ email: credentails.email, password: 'wrong' });
            expect(login.status).toBe(401);
            expect(login.body.token).toBeUndefined();
        });

        it('should not log in user with wrong email', async () => {
            await request(server).post('/auth/register').send(credentails);

            const login = await request(server).post('/auth/login').send({ email: 'wrong', password: credentails.password });
            expect(login.status).toBe(401);
            expect(login.body.token).toBeUndefined();
        });
    })
});