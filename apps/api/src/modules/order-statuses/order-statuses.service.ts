import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderStatusesRepository } from './order-statuses.repository.interface';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderStatusesService {
  constructor(private readonly repository: IOrderStatusesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`OrderStatus #${id} not found`);
    return record;
  }

  create(dto: CreateOrderStatusDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateOrderStatusDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
