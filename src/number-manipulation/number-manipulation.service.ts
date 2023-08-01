import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class NumberManipulationService {
  constructor(
    @Inject('OPTIONS') private readonly options: Record<string, any>,
  ) // @Inject(forwardRef(() => 'userService'))
  // private readonly userService: UsersService,
  {}

  toInt(num: string) {
    return +num;
  }

  toString(num: number) {
    return num.toString();
  }

  printOptions() {
    console.log(this.options);
  }
}
