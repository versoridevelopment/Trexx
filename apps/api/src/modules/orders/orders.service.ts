import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo activas
  findAll() {
    return this.prisma.orders.findMany({
      where: { is_active: true }
    });
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.prisma.orders.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        users: { select: { id: true, email: true, name: true } },
        order_statuses: true
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Búsqueda para usuario (solo si es activa)
  async findOne(id: bigint, userId?: string) {
    const record = await this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: { include: { addresses: true } }
      }
    });
    if (!record || !record.is_active) throw new NotFoundException(`Order #${id} not found`);
    if (userId && record.user_id !== userId) throw new ForbiddenException('No tienes acceso a esta orden');
    return record;
  }

  // Búsqueda para admin (activa o inactiva)
  async findOneAdmin(id: bigint) {
    const record = await this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: true,
        users: { select: { id: true, email: true } }
      }
    });
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    return record;
  }

  create(dto: CreateOrderDto) {
    return this.prisma.orders.create({ data: dto as any });
  }

  // Flujo completo de Checkout
  async checkout(userId: string, data: any) {
    const total = data.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    // Generamos un ID de orden basado en timestamp para emular un bigint único
    const orderId = BigInt(Date.now());
    
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: {
          id: orderId,
          user_id: userId,
          total,
          status_id: 1, // Pending
          order_items: {
            create: data.items.map((item: any) => ({
              product_id: item.productId,
              product_variant_id: item.variantId,
              quantity: item.quantity,
              price: item.price
            }))
          },
          order_shippings: {
            create: {
              recipient_name: data.recipientName,
              notes: data.notes,
              address_id: data.addressId
            }
          },
          payments: {
            create: {
              amount: total,
              method_id: data.paymentMethodId,
              status_id: 2, // Paid (Simulado)
            }
          }
        },
        include: {
          order_items: true,
          order_shippings: true,
          payments: true
        }
      });
      
      return {
        ...order,
        id: order.id.toString(),
        total: Number(order.total)
      };
    });
  }

  async update(id: bigint, dto: UpdateOrderDto) {
    await this.findOneAdmin(id);
    return this.prisma.orders.update({ where: { id } as any, data: dto as any });
  }

  // Soft delete
  async remove(id: bigint) {
    await this.findOneAdmin(id);
    return this.prisma.orders.update({
      where: { id } as any,
      data: { is_active: false }
    });
  }

  // Reactivar
  async restore(id: bigint) {
    const record = await this.prisma.orders.findUnique({ where: { id } as any });
    if (!record) throw new NotFoundException(`Order #${id} not found`);
    if (record.is_active) throw new BadRequestException(`Order #${id} is already active`);
    return this.prisma.orders.update({
      where: { id } as any,
      data: { is_active: true }
    })
  }
}
