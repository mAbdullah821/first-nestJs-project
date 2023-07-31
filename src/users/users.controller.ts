import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Req,
  HttpCode,
  Delete,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { StringToInt } from './pipes/string-to-int.pipe';
import { NumberManipulationService } from 'src/number-manipulation/number-manipulation.service';

interface Abc {
  a: string;
  b: string;
  c: string;
}

@Controller('users')
export class UsersController {
  constructor(
    @Inject('userServiceAlias') private readonly service: UsersService,
    @Inject('fakeObject') private readonly abc: Abc,
    private readonly numberManipulationService: NumberManipulationService,
  ) {}

  @Get()
  getAll() {
    // console.log('-------------------');
    // console.log(this.numberManipulationService.toInt('123456'));
    // console.log(this.numberManipulationService.toString(123456), '\n');
    return this.service.getAll();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return data;
  }

  @Patch(':id')
  update(@Param('id', StringToInt) id: number, @Body() data: UpdateUserDto) {
    console.log(this.abc);
    // return { id, ...data };
    return this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {}
}
