import { Module, DynamicModule, forwardRef } from '@nestjs/common';
import { NumberManipulationService } from './number-manipulation.service';
import { UsersModule } from '../users/users.module';

@Module({
  // providers: [NumberManipulationService],
  // exports: [NumberManipulationService],
})
export class NumberManipulationModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: NumberManipulationModule,
      imports: [UsersModule],
      providers: [
        { provide: 'OPTIONS', useValue: options },
        NumberManipulationService,
      ],
      exports: [NumberManipulationService],
    };
  }

  static async registerAsync(
    options: Record<string, any>,
  ): Promise<DynamicModule> {
    return {
      module: NumberManipulationModule,
      imports: [UsersModule],
      providers: [
        {
          provide: 'OPTIONS',
          useFactory: async () => {
            // await something ...
            return options;
          },
        },
        NumberManipulationService,
      ],
      exports: [NumberManipulationService],
    };
  }
}
