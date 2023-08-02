import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NumberManipulationModule } from './number-manipulation/number-manipulation.module';
import { ConfigModule } from './config/config.module';
// import { connection } from 'mongoose';

const MONGO_USER = 'admin';
const MONGO_PASSWORD = 'admin821';
const MONGO_IP = 'localhost';
const MONGO_PORT = 27018;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/`;

@Module({
  imports: [
    NinjasModule,
    UsersModule,
    MongooseModule.forRoot(mongoURL, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    NumberManipulationModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
