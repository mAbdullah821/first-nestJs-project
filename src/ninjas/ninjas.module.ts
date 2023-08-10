import { Module, Global } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [NinjasController],
  providers: [NinjasService],
  exports: [NinjasService],
})
export class NinjasModule {}
