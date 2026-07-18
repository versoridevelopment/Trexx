import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderItemsRepository } from './order-items.repository.interface';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private readonly repository: IOrderItemsRepository) {}

  findAll(includeInactive = false) {
    return this.repository.findAll(includeInactive);
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) throw new NotFoundException(`OrderItem #${id} not found`);
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`OrderItem #${id} not found`);
    return record;
  }

  create(dto: CreateOrderItemDto) {
    return this.repository.create({ ...dto, is_active: true });
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`OrderItem #${id} not found`);
    return this.repository.updateActiveStatus(id, true);
  }
}
