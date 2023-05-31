import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Naruto', power: 'wind', league: 'Leaf village' },
    { id: 1, name: 'Sasuke', power: 'thunder', league: 'Itachi tribe' },
  ];
  getNinjas(power?: 'wind' | 'thunder' | 'fire' | 'aqua' | 'earth') {
    if (power) {
      return this.ninjas.filter((ninjas) => ninjas.power === power);
    }
    return this.ninjas;
  }

  findNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja is not found');
    }
    return ninja;
  }
  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Math.round(Math.random() * 100),
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }
  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.findNinja(id);
  }
  deleteNinja(id: number) {
    const ninjaToRemoved = this.findNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return ninjaToRemoved;
  }
}
