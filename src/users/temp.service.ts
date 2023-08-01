import { Injectable } from '@nestjs/common';

@Injectable()
export class Temp {
  printHello() {
    console.log('Hello from TEMP!');
  }
}
