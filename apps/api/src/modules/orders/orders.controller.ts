import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderOwnerOrAdminGuard } from './guards/order-owner-or-admin.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

import { CheckoutOrderDto } from './dto/checkout-order.dto';

/**
 * Controlador REST del módulo "orders".
 * Administra la creación y ciclo de vida de las órdenes de compra.
 * Ruta base: /orders
 */
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  /**
   * Procesa el checkout de una compra: crea la orden a partir del carrito/datos
   * enviados para el usuario autenticado.
   * @route POST /orders/checkout
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del checkout (CheckoutOrderDto: items, dirección, método de pago, etc).
   * @param user Usuario autenticado inyectado por @CurrentUser(); se usa user.sub como ID.
   * @throws Error si no se pudo resolver el usuario autenticado (falta user.sub).
   * @returns La orden generada tras el checkout.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post('checkout')
  checkout(@Body() dto: CheckoutOrderDto, @CurrentUser() user: any) {
    if (!user || !user.sub) {
      throw new Error('User not found');
    }
    return this.service.checkout(user.sub, dto);
  }

  /**
   * Crea una orden directamente (uso administrativo/interno, sin flujo de checkout).
   * @route POST /orders
   * @auth Requiere JWT de Supabase.
   * @param dto Datos de la orden (CreateOrderDto).
   * @returns La orden creada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todas las órdenes.
   * @route GET /orders
   * @auth Requiere JWT de Supabase.
   * @returns Arreglo de órdenes.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene una orden por su ID.
   * Autorizado mediante OrderOwnerOrAdminGuard.
   * @route GET /orders/:id
   * @auth Requiere JWT de Supabase + ser dueño de la orden o administrador.
   * @param id ID de la orden (convertido a BigInt).
   * @returns La orden encontrada.
   */
  @UseGuards(SupabaseAuthGuard, OrderOwnerOrAdminGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(BigInt(id));
  }

  /**
   * Actualiza parcialmente una orden.
   * @route PATCH /orders/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID de la orden (convertido a BigInt).
   * @param dto Campos a modificar (UpdateOrderDto).
   * @returns La orden actualizada.
   */
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(BigInt(id), dto);
  }

  /**
   * Elimina (soft delete) una orden.
   * @route DELETE /orders/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID de la orden (convertido a BigInt).
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(BigInt(id));
  }

  /**
   * Lista todas las órdenes para administración, incluyendo opcionalmente
   * las inactivas/eliminadas.
   * @route GET /orders/admin/all?includeInactive=true|false
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param includeInactive Query param string ('true'/'false') para incluir inactivas.
   * @returns Arreglo de órdenes (todas o solo activas según el flag).
   */
  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAllAdmin(includeInactive === 'true');
  }

  /**
   * Restaura una orden previamente eliminada (soft delete).
   * @route PATCH /orders/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID de la orden a restaurar (convertido a BigInt).
   * @returns La orden restaurada.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id') id: string) {
    return this.service.restore(BigInt(id));
  }
}
