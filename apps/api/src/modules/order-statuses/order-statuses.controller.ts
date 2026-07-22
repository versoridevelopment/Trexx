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
import { OrderStatusesService } from './order-statuses.service';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

/**
 * Controlador REST del módulo "order-statuses".
 * Administra los posibles estados de una orden (ej: pendiente, pagada, enviada).
 * Ruta base: /order_statuses
 */
@ApiTags('order-statuses')
@Controller('order_statuses')
export class OrderStatusesController {
  constructor(private readonly service: OrderStatusesService) {}

  /**
   * Crea un nuevo estado de orden.
   * @route POST /order_statuses
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del estado (CreateOrderStatusDto).
   * @returns El estado de orden creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateOrderStatusDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los estados de orden.
   * @route GET /order_statuses
   * @auth Público.
   * @returns Arreglo de estados de orden.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un estado de orden por su ID.
   * @route GET /order_statuses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del estado.
   * @returns El estado de orden encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un estado de orden.
   * @route PATCH /order_statuses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del estado.
   * @param dto Campos a modificar (UpdateOrderStatusDto).
   * @returns El estado de orden actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un estado de orden.
   * @route DELETE /order_statuses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del estado a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
