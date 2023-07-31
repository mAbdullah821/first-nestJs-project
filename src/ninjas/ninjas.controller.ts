import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Header,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Inject,
} from '@nestjs/common';

import { NinjasDto } from './dto/ninjas.dto';
import { CreateNinjasDto } from './dto/create-ninjas.dto';
import { UpdateNinjasDto } from './dto/update-ninjas.dto';
import { NinjasService } from './ninjas.service';
import { IsAdultGuard } from 'src/is-adult/is-adult.guard';
import { UsersService } from 'src/users/users.service';

@Controller('ninjas')
export class NinjasController {
  constructor(
    @Inject('userService') private readonly userService: UsersService,
    private readonly ninjasService: NinjasService,
  ) {}

  @Post()
  addNinja(@Body(new ValidationPipe()) ninja: NinjasDto) {
    return this.ninjasService.addNinja(ninja);
  }

  @Patch(':id')
  async updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) ninja: UpdateNinjasDto,
  ) {
    console.log(await this.userService.update(id, ninja));
    console.log((this.userService as unknown as { ttl: string }).ttl);
    console.log(
      (this.userService as unknown as { privateField: string }).privateField,
    );
    console.log(
      (this.userService as unknown as { ttl: string; hello: string }).hello,
    );

    return this.ninjasService.updateNinja(id, ninja);
  }

  @Delete(':id')
  @Header('Hello-world', 'You deleted me killer :() ')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    this.ninjasService.deleteNinja(id);
    return { msg: 'Deleted Successfully :)' };
  }

  @Get()
  @UseGuards(IsAdultGuard)
  getAllNinjas() {
    return this.ninjasService.getAllNinjas();
  }

  @Get('adults')
  getAdultNinjas() {
    return this.ninjasService.getAdultNinjas();
  }
}
