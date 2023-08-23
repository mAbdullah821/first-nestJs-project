import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(_user: IUser): Promise<Object | any> {
    const { username, password } = _user;
    const user = await this.userAuthService.findByUsername(username);

    if (!user || user.password !== password) throw new UnauthorizedException();

    const payload = { sub: user.id, username };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
