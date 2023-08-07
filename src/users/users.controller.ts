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
  SetMetadata,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
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

const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Roles('admin')
@Controller({ path: 'users', scope: Scope.DEFAULT })
export class UsersController {
  constructor(
    @Inject('userServiceAlias') private readonly service: UsersService,
    @Inject('fakeObject') private readonly abc: Abc,
    private moduleRef: ModuleRef,
    private reflector: Reflector,
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
  @Roles('normal_user')
  create(@Body() data: CreateUserDto) {
    console.log(data, 123456);
    return this.service.add(data);
  }

  @Patch(':id')
  //@Param('id', StringToInt)
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    console.log(this.abc);
    // return { id, ...data };
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseFilters(HttpExceptionFilter)
  @HttpCode(HttpStatus.NO_CONTENT)
  // @Param('id', ParseIntPipe)
  delete(@Param('id') id: string) {
    // throw new InternalServerErrorException();
    return this.service.delete(id);
  }
}
