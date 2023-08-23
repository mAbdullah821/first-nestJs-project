import { Controller, Body, Post, Get, Req } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from '../interface/user.interface';
import { Public } from '../decorator/public.decorator';
import { Request } from 'express';

interface IExtendedRequest extends Request {
  user: {
    sub: number;
    username: string;
    iat: number;
    exp: number;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  signIn(@Body() user: IUser): Promise<Object | any> {
    return this.authService.signIn(user);
  }

  @Public()
  @Get('public-endpoint')
  getPublicHello() {
    return { msg: 'Hello, public' };
  }

  @Get('protected-endpoint')
  getProtectedHello(@Req() req: IExtendedRequest) {
    return { msg: 'Hello, protected', user: req.user };
  }
}
