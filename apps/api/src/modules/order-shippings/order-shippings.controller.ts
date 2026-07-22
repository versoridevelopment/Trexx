import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderShippingsService } from './order-shippings.service';
import { CreateOrderShippingDto } from './dto/create-order-shipping.dto';
import { UpdateOrderShippingDto } from './dto/update-order-shipping.dto';

/**
 * Controlador REST del módulo "order-shippings".
 * Administra los datos de envío asociados a una orden (dirección, ciudad, código postal, etc).
 * Ruta base: /order_shippings
 */
@ApiTags('order-shippings')
@Controller('order_shippings')
export class OrderShippingsController {
  constructor(private readonly service: OrderShippingsService) {}

  /**
   * Crea un nuevo registro de envío de orden.
   * @route POST /order_shippings
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del envío (CreateOrderShippingDto).
   * @returns El envío de orden creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateOrderShippingDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los envíos de orden.
   * @route GET /order_shippings
   * @auth Requiere JWT de Supabase.
   * @returns Arreglo de envíos de orden.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un envío de orden por su ID.
   * @route GET /order_shippings/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del envío.
   * @returns El envío de orden encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un envío de orden.
   * @route PATCH /order_shippings/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del envío.
   * @param dto Campos a modificar (UpdateOrderShippingDto).
   * @returns El envío de orden actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderShippingDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un envío de orden.
   * @route DELETE /order_shippings/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del envío a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
