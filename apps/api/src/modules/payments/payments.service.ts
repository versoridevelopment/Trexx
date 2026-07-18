import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentsRepository } from './payments.repository.interface';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly repository: IPaymentsRepository) {}

  findAll(includeInactive = false) {
    return this.repository.findAll(includeInactive);
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) throw new NotFoundException(`Payment #${id} not found`);
    return record;
  }

  async findOneAdmin(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`Payment #${id} not found`);
    return record;
  }

  create(dto: CreatePaymentDto) {
    return this.repository.create({ ...dto, is_active: true });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const record = await this.repository.findOne(id);
    if (!record) throw new NotFoundException(`Payment #${id} not found`);
    return this.repository.updateActiveStatus(id, true);
  }
}
