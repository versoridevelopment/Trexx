import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

/**
 * Controlador REST del módulo "order-items".
 * Administra los ítems (líneas de producto) que componen una orden.
 * Ruta base: /order_items
 */
@ApiTags('order-items')
@Controller('order_items')
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  /**
   * Crea un nuevo ítem de orden.
   * @route POST /order_items
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del ítem (CreateOrderItemDto).
   * @returns El ítem de orden creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los ítems de orden.
   * @route GET /order_items
   * @auth Requiere JWT de Supabase.
   * @returns Arreglo de ítems de orden.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un ítem de orden por su ID.
   * @route GET /order_items/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del ítem.
   * @returns El ítem de orden encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un ítem de orden.
   * @route PATCH /order_items/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del ítem.
   * @param dto Campos a modificar (UpdateOrderItemDto).
   * @returns El ítem de orden actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un ítem de orden.
   * @route DELETE /order_items/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del ítem a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
