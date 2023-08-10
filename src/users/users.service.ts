import { Model, Connection } from 'mongoose';
import {
  Injectable,
  Inject,
  Scope,
  forwardRef,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { INQUIRER, ModuleRef } from '@nestjs/core';
import { NinjasService } from '../ninjas/ninjas.service';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '../config/config.service';
import { NumberManipulationService } from 'src/number-manipulation/number-manipulation.service';
import { Temp } from './temp.service';
import { Tmp } from './models/tmp.schema';
import { UserRepository } from './repositories/user.repository';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService implements OnModuleInit {
  @Inject(INQUIRER)
  protected readonly parentClass: object;

  constructor(
    @Optional() protected readonly configService: ConfigService,
    // @InjectModel(User.name) private userModel: Model<UserDocument>,
    // @InjectConnection() private connection: Connection,
    // @Inject(INQUIRER) protected readonly parentClass: object,
    // @Inject(forwardRef(() => NumberManipulationService)) private readonly numberManipulationService: NumberManipulationService,
    // protected moduleRef: ModuleRef,
    private readonly ninjasService: NinjasService,
    private readonly repository: UserRepository,
  ) {}

  onModuleInit() {
    console.log('[UsersService] The module has been initialized.');
  }

  async add(user: CreateUserDto): Promise<User> {
    // const tmp = await this.moduleRef.create(Temp);
    // tmp.printHello();
    // user.tmps = [{ name: 'hello' }, { name: 'world' }, { name: 'war' }];
    console.log(user);
    return this.repository.create(user);
  }

  async getAll(): Promise<User[]> {
    return this.repository.find({});
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return this.repository.updateOne(id, user);
  }

  async delete(id: string): Promise<User> {
    return this.repository.deleteOne(id);
  }

  getHello() {
    // console.log(this.parentClass?.constructor?.name, ' | Hello parentClass');
  }
}

@Injectable()
export class UsersService2 extends UsersService {
  // async update(id: number, user: UpdateUserDto): Promise<Object> {
  //   console.log(this.configService.get('HELLO_MESSAGE'));
  //   console.log(NumberManipulationService.name);
  //   return Promise.resolve({ ...user, hello: 'world' });
  // }
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
