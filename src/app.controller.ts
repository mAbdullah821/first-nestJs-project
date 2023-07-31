import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Put,
  Param,
  Query,
  Body,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getGlobal(): string {
    return this.appService.getGlobal();
  }
}
