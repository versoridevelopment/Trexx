import { Injectable, NotFoundException } from '@nestjs/common';
import { ICitysRepository } from './cities.repository.interface';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitysService {
  constructor(private readonly repository: ICitysRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`City #${id} not found`);
    return record;
  }

  create(dto: CreateCityDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateCityDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
