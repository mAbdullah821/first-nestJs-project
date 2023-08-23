import { Injectable } from '@nestjs/common';

interface IUser {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UserAuthService {
  private readonly users: IUser[] = [
    {
      id: 1,
      username: 'memo',
      password: '123456',
    },
    {
      id: 2,
      username: 'maro',
      password: '123456',
    },
    {
      id: 3,
      username: 'mezo',
      password: '123456',
    },
  ];

  async findByUsername(username: string): Promise<IUser | any> {
    return this.users.find((user) => user.username === username);
  }
}
