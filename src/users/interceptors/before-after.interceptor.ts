import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { tap, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class BeforeAfterInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    console.time('loggerTime');

    return next.handle().pipe(
      timeout(1000),
      catchError((err) => {
        console.timeEnd('loggerTime');
        console.log(err.message);

        if (err instanceof TimeoutError)
          return throwError(() => new RequestTimeoutException());
        else return throwError(() => new InternalServerErrorException());

        // throw new InternalServerErrorException();
      }),
      tap(() => {
        console.log('After...');
        console.timeEnd('loggerTime');
      }),
    );
  }
}
