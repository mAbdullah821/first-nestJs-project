import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NinjasDto } from 'src/ninjas/dto/ninjas.dto';

@Injectable()
export class IsAdultGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const isAdult = (req.body as unknown as NinjasDto).isAdult;
    return isAdult && typeof isAdult === 'boolean';
  }
}
