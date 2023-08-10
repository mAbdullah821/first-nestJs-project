import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, arg: ArgumentsHost) {
    const ctx = arg.switchToHttp();
    const res = ctx.getResponse<Response>();

    switch (exception.code) {
      case 11000:
        res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          type: exception.name,
          msg: 'Duplicate key error',
        });
        break;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          type: exception.name,
          msg: 'Server error',
        });
        break;
    }
  }
}
