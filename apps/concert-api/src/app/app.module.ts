import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { DataModule } from './data.module';
import { Neo4jModule } from './neo4j/neo4j.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    ),
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude({ path: 'api/auth/login', method: RequestMethod.POST }, { path: 'api/data/concert', method: RequestMethod.GET }, { path: 'api/auth/register', method: RequestMethod.POST }, { path: 'api/data/concert/:id', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
