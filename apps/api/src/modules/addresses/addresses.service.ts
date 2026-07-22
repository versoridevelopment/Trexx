import { Injectable, NotFoundException } from '@nestjs/common';
import { IAddressesRepository } from './addresses.repository.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly repository: IAddressesRepository) {}

  findAll(userId?: string) {
    return this.repository.findAll(userId);
  }

  async findOne(id: number, userId?: string) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active)
      throw new NotFoundException(`Address #${id} not found`);
    if (userId && record.user_id !== userId)
      throw new NotFoundException(`Address #${id} not found`);
    return record;
  }

  create(dto: CreateAddressDto) {
    return this.repository.create({ ...dto, is_active: true });
  }

  async update(id: number, dto: UpdateAddressDto, userId?: string) {
    await this.findOne(id, userId);
    return this.repository.update(id, dto);
  }

  async remove(id: number, userId?: string) {
    await this.findOne(id, userId);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`Address #${id} not found`);
    return this.repository.updateActiveStatus(id, true);
  }
}
