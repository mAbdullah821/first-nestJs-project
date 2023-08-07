import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable, throwError, tap, catchError } from 'rxjs';

@Injectable()
export class UserLogger implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const roles1 = this.reflector.get<string[]>('roles', context.getClass());
    const roles2 = this.reflector.getAll<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles3 = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles4 = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(11111, roles1);
    console.log(22222, roles2);
    console.log(33333, roles3);
    console.log(44444, roles4);

    const request = context.switchToHttp().getRequest<Request>();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    console.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        console.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
            Date.now() - now
          }ms`,
        );
      }),
      catchError((err) => throwError(() => err)),
    );
  }
}
