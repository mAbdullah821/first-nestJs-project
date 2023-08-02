import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import {
  UsersService,
  UsersService2,
  UsersServiceObject,
} from './users.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.entity';
import { NumberManipulationModule } from 'src/number-manipulation/number-manipulation.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggerMiddlewareV2 } from './middleware/logger-v2.middleware';
import { functionalLogger } from './middleware/functional-logger.middleware';
import { NumberManipulationService } from 'src/number-manipulation/number-manipulation.service';
import { ConfigModule } from '../config/config.module';
import { UserLogger } from './interceptors/logging.interceptor';
import { Event, EventSchema } from './models/event.schema';
import {
  ClickedLinkEvent,
  ClickedLinkEventSchema,
} from './models/click-link-event.schema';
import { SignUpEvent, SignUpEventSchema } from './models/sign-up-event.schema';
import { UserRepository } from './repositories/user.repository';

const fakeObjectProvider = {
  provide: 'fakeObject',
  useFactory: async () => {
    const sleep = (seconds) =>
      new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    await sleep(1);

    return {
      a: 'A',
      b: 'B',
      c: 'C',
    };
  },
};

const eventModel = {};

@Module({
  imports: [
    ConfigModule.register({ folder: '/' }),
    NumberManipulationModule.register({
      hello1: 'world1',
      hello2: 'World2',
    }),

    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.plugin(require('mongoose-autopopulate'));
          schema.post('save', function () {
            console.log('Hello From post:save_2');
          });

          return schema;
        },
      },
      {
        name: Event.name,
        useFactory: () => EventSchema,
        discriminators: [
          { name: ClickedLinkEvent.name, schema: ClickedLinkEventSchema },
          { name: SignUpEvent.name, schema: SignUpEventSchema },
        ],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UserRepository,
    {
      provide: getModelToken(Event.name),
      useValue: eventModel,
    },
    // UserLogger,
    {
      // provide: UsersService,
      provide: 'userService',
      // useClass: UsersService2,
      useClass: UsersService,
      scope: Scope.DEFAULT,
      // useValue: UsersServiceObject,
      // useFactory: (numberManipulationService: NumberManipulationService) => {
      //   return {
      //     ttl: '15 m',
      //     privateField: 'Not really',
      //     async update(id: number, user: Object): Promise<Object> {
      //       return Promise.resolve({ ...user, hello: 'world', world: 'hello' });
      //     },
      //   };
      // },
      // inject: [NumberManipulationService], // InjectionToken (service token)
    },
    {
      provide: 'userServiceAlias',
      useExisting: 'userService',
    },
    fakeObjectProvider,
  ],
  exports: ['userService', fakeObjectProvider],
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
      .exclude({ path: 'users', method: RequestMethod.HEAD })
      .forRoutes(UsersController);
  }
}
