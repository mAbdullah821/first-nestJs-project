import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGlobal(): string {
    return 'Hello Global';
  }
}
