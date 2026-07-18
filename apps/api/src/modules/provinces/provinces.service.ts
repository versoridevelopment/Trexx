import { Injectable, NotFoundException } from '@nestjs/common';
import { IProvincesRepository } from './provinces.repository.interface';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(private readonly repository: IProvincesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`Province #${id} not found`);
    return record;
  }

  create(dto: CreateProvinceDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateProvinceDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
