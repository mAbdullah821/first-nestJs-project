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
  Res,
  HttpCode,
  Delete,
  HttpStatus,
  Inject,
  Scope,
  UseInterceptors,
  UseFilters,
  InternalServerErrorException,
  SetMetadata,
  OnModuleInit,
  OnModuleDestroy,
  Redirect,
  All,
  HttpException,
  NotFoundException,
  DefaultValuePipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { StringToInt } from './pipes/string-to-int.pipe';
import { UserLogger } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { HttpExceptionFilter2 } from './filters/http-execption2.filter';
import { MongooseErrorFilter } from './filters/mongoose-error.filter';
import { AnythingFilter } from './filters/anything.filter';
import { Roles } from './decorators/roles.decorator';
// import { setInterval } from 'timers/promises';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { IntToInt } from './pipes/int-to-int.pipe';
import { RoleGuard } from './guards/role.guard';
import { BeforeAfterInterceptor } from './interceptors/before-after.interceptor';
import { User } from './decorators/user.decorator';
import { ConfigService } from '@nestjs/config';

interface Abc {
  a: string;
  b: string;
  c: string;
}

const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(seconds * 1000)));

@Roles('admin')
// @UseFilters(AnythingFilter)
@UseFilters(MongooseErrorFilter)
@Controller({ path: 'users', scope: Scope.DEFAULT })
export class UsersController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('userServiceAlias') private readonly service: UsersService,
    @Inject('fakeObject') private readonly abc: Abc,
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    let cnt = 1;
    const intervalTime = 250;
    const sleepSeconds = 1;
    const printCount = Math.floor((sleepSeconds * 1000) / intervalTime);

    const intervalId = setInterval(() => {
      console.log(`the ${cnt++}'th time`);

      if (cnt > printCount) clearInterval(intervalId);
    }, intervalTime);

    await sleep(sleepSeconds);
    console.log('[UsersController] The module has been initialized.');
  }

  onModuleDestroy() {
    console.log('[UsersController] The module has been Destroyed.');
  }

  @Get()
  // @Res({ passthrough: true }) res: Response,
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
  @Roles('user')
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    console.log(this.abc);
    // return { id, ...data };
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseFilters(HttpExceptionFilter)
  @HttpCode(HttpStatus.NO_CONTENT)
  // @Param('id', ParseIntPipe)
  delete(@Param('id') id: string) {
    // throw new InternalServerErrorException();
    return this.service.delete(id);
  }

  @All('not-found')
  @Redirect('http://localhost:3000/users', 302)
  notFound() {
    return {
      statusCode: 301,
    };
  }

  @All('error1')
  @UseFilters(HttpExceptionFilter2)
  error1() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @All('error2')
  error2() {
    throw new HttpException(
      { status: 'Failed', msg: 'Forbidden' },
      HttpStatus.FORBIDDEN,
    );
  }

  @All('error3')
  error3() {
    throw new ForbiddenException();
  }

  @All('error4')
  error4() {
    throw new NotFoundException('Not Found', {
      cause: new Error('Not Found Path'),
      description: 'Hello World',
    });
  }

  @All('pipe')
  pipe(@Body('age', new DefaultValuePipe(18), IntToInt) body: { age: number }) {
    return 'Ok';
  }

  @All('before-after-interceptor')
  @UseInterceptors(BeforeAfterInterceptor)
  async intercept() {
    await sleep(Math.random() * 2);
    if (Date.now() % 2 === 0) return 'Ok';
    else throw new BadRequestException();
  }

  @All('custom-decorator')
  customDecorator(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: UpdateUserDto,
  ) {
    return user;
  }

  @All('print-env-variables')
  printEnvVariables() {
    // before using the custom config-File.
    console.log(this.configService.get<number>('PORT'));
    console.log(this.configService.get<number>('DATABASE_USER'));
    console.log(this.configService.get<number>('DATABASE_PASSWORD'));

    // after using the custom config-File
    console.log('--------------');
    console.log(this.configService.get<number>('port'));
    console.log(this.configService.get<string>('database.user'));
    console.log(this.configService.get<string>('database.password'));
    return 'Done';
  }
}
