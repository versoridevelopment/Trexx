import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentStatusesRepository } from './payment-statuses.repository.interface';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class PaymentStatussService {
  constructor(private readonly repository: IPaymentStatusesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`PaymentStatus #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentStatusDto) {
    return this.repository.create(Object.assign({}, dto));
  }

  async update(id: number, dto: UpdatePaymentStatusDto) {
    await this.findOne(id);
    return this.repository.update(id, Object.assign({}, dto));
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
