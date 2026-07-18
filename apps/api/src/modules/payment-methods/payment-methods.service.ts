import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentMethodsRepository } from './payment-methods.repository.interface';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly repository: IPaymentMethodsRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`PaymentMethod #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentMethodDto) {
    return this.repository.create(Object.assign({}, dto));
  }

  async update(id: number, dto: UpdatePaymentMethodDto) {
    await this.findOne(id);
    return this.repository.update(id, Object.assign({}, dto));
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
