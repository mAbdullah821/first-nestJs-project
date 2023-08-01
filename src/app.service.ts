import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('userService') private readonly userService: UsersService,
  ) {}

  getHello(): string {
    this.userService.getHello();
    return 'Hello World!';
  }

  getGlobal(): string {
    return 'Hello Global';
  }
}
