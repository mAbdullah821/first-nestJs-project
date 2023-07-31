import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberManipulationService {
  toInt(num: string) {
    return +num;
  }

  toString(num: number) {
    return num.toString();
  }
}
