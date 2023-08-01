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
  Scope,
  UseInterceptors,
  UseFilters,
  InternalServerErrorException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { StringToInt } from './pipes/string-to-int.pipe';
import { UserLogger } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exeception.filter';

interface Abc {
  a: string;
  b: string;
  c: string;
}

@Controller({ path: 'users', scope: Scope.DEFAULT })
export class UsersController {
  constructor(
    @Inject('userServiceAlias') private readonly service: UsersService,
    @Inject('fakeObject') private readonly abc: Abc,
    private moduleRef: ModuleRef,
  ) {}

  @Get()
  getAll() {
    // console.log('-------------------');
    // console.log(this.numberManipulationService.toInt('123456'));
    // console.log(this.numberManipulationService.toString(123456), '\n');
    return this.service.getAll();
  }

  @Post()
  @UseInterceptors(UserLogger)
  create(@Body() data: CreateUserDto) {
    return this.service.add(data);
  }

  @Patch(':id')
  update(@Param('id', StringToInt) id: number, @Body() data: UpdateUserDto) {
    console.log(this.abc);
    // return { id, ...data };
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    throw new InternalServerErrorException();
  }
}
