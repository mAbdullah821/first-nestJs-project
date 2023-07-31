import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import {
  UsersService,
  UsersService2,
  UsersServiceObject,
} from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.entity';
import { NumberManipulationModule } from 'src/number-manipulation/number-manipulation.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggerMiddlewareV2 } from './middleware/logger-v2.middleware';
import { functionalLogger } from './middleware/functional-logger.middleware';
import { NumberManipulationService } from 'src/number-manipulation/number-manipulation.service';

@Module({
  imports: [
    NumberManipulationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      // provide: UsersService,
      provide: 'userService',
      // useClass: UsersService2,
      // useValue: UsersServiceObject,
      useFactory: (numberManipulationService: NumberManipulationService) => {
        return {
          ttl: '15 m',
          privateField: 'Not really',
          async update(id: number, user: Object): Promise<Object> {
            return Promise.resolve({ ...user, hello: 'world', world: 'hello' });
          },
        };
      },
      inject: [NumberManipulationService],
    },
  ],
  exports: ['userService'],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(
    //     { path: 'users', method: RequestMethod.GET },
    //     { path: 'users', method: RequestMethod.POST },
    //     { path: 'users/:id', method: RequestMethod.PATCH },
    //   );
    // -----------------------
    // consumer.apply(LoggerMiddleware).forRoutes('users');
    // -----------------------
    // consumer.apply(LoggerMiddleware).forRoutes(UsersController);

    // consumer
    //   .apply(LoggerMiddlewareV2)
    //   .exclude({ path: 'users', method: RequestMethod.GET })
    //   .forRoutes(UsersController);
    // -----------------------
    consumer
      .apply(LoggerMiddleware, functionalLogger)
      .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes(UsersController);
  }
}
