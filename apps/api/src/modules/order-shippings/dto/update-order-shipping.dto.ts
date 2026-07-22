import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderShippingDto } from './create-order-shipping.dto';

export class UpdateOrderShippingDto extends PartialType(
  CreateOrderShippingDto,
) {}
