import { Module } from '@nestjs/common';
import { NumberManipulationService } from './number-manipulation.service';

@Module({
  providers: [NumberManipulationService],
  exports: [NumberManipulationService],
})
export class NumberManipulationModule {}
