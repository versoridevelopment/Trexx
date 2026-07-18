import { Injectable, NotFoundException } from '@nestjs/common';
import { IPostalCodesRepository } from './postal-codes.repository.interface';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Injectable()
export class PostalCodesService {
  constructor(private readonly repository: IPostalCodesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`PostalCode #${id} not found`);
    return record;
  }

  create(dto: CreatePostalCodeDto) {
    return this.repository.create(Object.assign({}, dto));
  }

  async update(id: number, dto: UpdatePostalCodeDto) {
    await this.findOne(id);
    return this.repository.update(id, Object.assign({}, dto));
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
