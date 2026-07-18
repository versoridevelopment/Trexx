import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { IOrdersRepository } from './orders.repository.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: IOrdersRepository) {}

  // Público: solo activas
  findAll() {
    return this.repository.findAll();
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.repository.findAllAdmin(includeInactive);
  }

  // Búsqueda para usuario (solo si es activa)
  async findOne(id: bigint, userId?: string) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) throw new NotFoundException(`Order #${id} not found`);
    if (userId && record.user_id !== userId) throw new ForbiddenException('No tienes acceso a esta orden');
    return record;
  }

  // Búsqueda para admin (activa o inactiva)
  async findOneAdmin(id: bigint) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    return record;
  }

  create(dto: CreateOrderDto) {
    return this.repository.create(dto);
  }

  // Flujo completo de Checkout
  async checkout(userId: string, data: any) {
    // Generamos un ID de orden basado en timestamp para emular un bigint único
    const orderId = BigInt(Date.now());
    const order = await this.repository.checkout(orderId, { ...data, userId });

    return {
      ...order,
      id: order.id.toString(),
      total: Number(order.total),
    };
  }

  async update(id: bigint, dto: UpdateOrderDto) {
    await this.findOneAdmin(id);
    return this.repository.update(id, dto);
  }

  // Soft delete
  async remove(id: bigint) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  // Reactivar
  async restore(id: bigint) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    if (record.is_active) throw new BadRequestException(`Order #${id} is already active`);
    return this.repository.updateActiveStatus(id, true);
  }
}
