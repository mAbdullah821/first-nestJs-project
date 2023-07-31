import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User } from './models/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async add(user: CreateUserDto): Promise<CreateUserDto> {
    return Promise.resolve(user);
  }

  async getAll(): Promise<{}> {
    return Promise.resolve({});
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateUserDto> {
    return Promise.resolve(user);
  }
}

@Injectable()
export class UsersService2 extends UsersService {
  async update(id: number, user: UpdateUserDto): Promise<Object> {
    return Promise.resolve({ ...user, hello: 'world' });
  }
}

export const UsersServiceObject = {
  _user: {
    id: 123456789,
    name: 'Memo',
    age: 18,
    isAdult: true,
  },

  add(user: CreateUserDto): Promise<UserDto> {
    return Promise.resolve(this._user);
  },

  getAll(): Promise<UserDto> {
    return Promise.resolve(this._user);
  },

  update(id: number, user: UpdateUserDto): Promise<UserDto> {
    return Promise.resolve(this._user);
  },
};
