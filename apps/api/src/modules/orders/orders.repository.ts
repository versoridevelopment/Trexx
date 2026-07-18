import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrdersRepository } from './orders.repository.interface';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.orders.findMany({
      where: { is_active: true },
    });
  }

  findAllAdmin(includeInactive = false) {
    return this.prisma.orders.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        users: { select: { id: true, email: true, name: true } },
        order_statuses: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: bigint) {
    return this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: { include: { addresses: true } },
      },
    });
  }

  findOneAdmin(id: bigint) {
    return this.prisma.orders.findUnique({
      where: { id } as any,
      include: {
        order_items: true,
        order_shippings: true,
        users: { select: { id: true, email: true } },
      },
    });
  }

  create(data: any) {
    return this.prisma.orders.create({ data });
  }

  update(id: bigint, data: any) {
    return this.prisma.orders.update({ where: { id } as any, data });
  }

  updateActiveStatus(id: bigint, isActive: boolean) {
    return this.prisma.orders.update({
      where: { id } as any,
      data: { is_active: isActive },
    });
  }

  // Flujo de checkout: creación atómica de orden + items + envío + pago
  async checkout(orderId: bigint, data: any) {
    const total = data.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: {
          id: orderId,
          user_id: data.userId,
          total,
          status_id: 1, // Pending
          order_items: {
            create: data.items.map((item: any) => ({
              product_id: item.productId,
              product_variant_id: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
          order_shippings: {
            create: {
              recipient_name: data.recipientName,
              notes: data.notes,
              address_id: data.addressId,
            },
          },
          payments: {
            create: {
              amount: total,
              method_id: data.paymentMethodId,
              status_id: 2, // Paid (Simulado)
            },
          },
        },
        include: {
          order_items: true,
          order_shippings: true,
          payments: true,
        },
      });

      return order;
    });
  }
}
