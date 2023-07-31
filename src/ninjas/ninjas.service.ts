import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjasDto } from './dto/create-ninjas.dto';
import { UpdateNinjasDto } from './dto/update-ninjas.dto';

@Injectable()
export class NinjasService {
  private ninjas: UpdateNinjasDto[] = [
    { id: 1, name: 'memo', age: 18, isAdult: true },
    { id: 2, name: 'young', age: 13, isAdult: false },
    { id: 3, name: 'old', age: 38, isAdult: true },
  ];

  addNinja(ninja: CreateNinjasDto) {
    const id = Date.now();
    this.ninjas.push({ id, ...ninja });
    return this.ninjas.at(-1);
  }

  updateNinja(id: number, ninja: UpdateNinjasDto) {
    const idx = this.ninjas.findIndex((ninja) => ninja.id === id);

    if (idx === -1) throw new NotFoundException('No Ninja with this id!');

    this.ninjas[idx] = { ...this.ninjas[idx], ...ninja };

    return this.ninjas.at(idx);
  }

  deleteNinja(id: number) {
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
  }

  getAllNinjas() {
    return this.ninjas;
  }

  getAdultNinjas() {
    return this.ninjas.filter((ninja) => ninja.isAdult);
  }
}
