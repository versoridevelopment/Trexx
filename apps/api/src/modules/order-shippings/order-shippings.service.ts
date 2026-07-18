import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderShippingsRepository } from './order-shippings.repository.interface';
import { CreateOrderShippingDto } from './dto/create-order-shipping.dto';
import { UpdateOrderShippingDto } from './dto/update-order-shipping.dto';

@Injectable()
export class OrderShippingsService {
  constructor(private readonly repository: IOrderShippingsRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`OrderShipping #${id} not found`);
    return record;
  }

  create(dto: CreateOrderShippingDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateOrderShippingDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
