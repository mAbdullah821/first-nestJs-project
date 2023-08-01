import { Model, Connection } from 'mongoose';
import { Injectable, Inject, Scope, forwardRef } from '@nestjs/common';
import { INQUIRER, ModuleRef } from '@nestjs/core';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User } from './models/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '../config/config.service';
import { NumberManipulationService } from 'src/number-manipulation/number-manipulation.service';
import { Temp } from './temp.service';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(
    protected readonly configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    @Inject(INQUIRER) protected readonly parentClass: object,
    @Inject(forwardRef(() => NumberManipulationService))
    private readonly numberManipulationService: NumberManipulationService,
    protected moduleRef: ModuleRef,
  ) {}

  async add(user: CreateUserDto): Promise<CreateUserDto> {
    const tmp = await this.moduleRef.create(Temp);
    tmp.printHello();
    return Promise.resolve(user);
  }

  async getAll(): Promise<{}> {
    return Promise.resolve({});
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateUserDto> {
    return Promise.resolve(user);
  }

  getHello() {
    console.log(this.parentClass?.constructor?.name, ' | Hello parentClass');
  }
}

@Injectable()
export class UsersService2 extends UsersService {
  async update(id: number, user: UpdateUserDto): Promise<Object> {
    console.log(this.configService.get('HELLO_MESSAGE'));
    console.log(NumberManipulationService.name);

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
