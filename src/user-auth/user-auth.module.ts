import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

@Module({
  controllers: [],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
