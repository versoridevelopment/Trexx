import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const checkoutItemSchema = z.object({
  productId: z.number().int().positive(),
  variantId: z.number().int().positive().optional(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const CheckoutOrderSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'El carrito está vacío'),
  addressId: z.number().int().positive(),
  paymentMethodId: z.number().int().positive(),
  recipientName: z.string().min(1, 'El nombre de quien recibe es obligatorio'),
  notes: z.string().optional(),
});

export class CheckoutOrderDto extends createZodDto(CheckoutOrderSchema) {}
