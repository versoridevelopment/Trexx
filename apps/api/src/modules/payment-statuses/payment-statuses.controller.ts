import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentStatussService } from './payment-statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

/**
 * Controlador REST del módulo "payment-statuses".
 * Administra los posibles estados de un pago (ej: pendiente, aprobado, rechazado).
 * Ruta base: /payment_statuses
 */
@ApiTags('payment-statuses')
@Controller('payment_statuses')
export class PaymentStatussController {
  constructor(private readonly service: PaymentStatussService) {}

  /**
   * Crea un nuevo estado de pago.
   * @route POST /payment_statuses
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del estado (CreatePaymentStatusDto).
   * @returns El estado de pago creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreatePaymentStatusDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los estados de pago.
   * @route GET /payment_statuses
   * @auth Público.
   * @returns Arreglo de estados de pago.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un estado de pago por su ID.
   * @route GET /payment_statuses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del estado.
   * @returns El estado de pago encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un estado de pago.
   * @route PATCH /payment_statuses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del estado.
   * @param dto Campos a modificar (UpdatePaymentStatusDto).
   * @returns El estado de pago actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentStatusDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un estado de pago.
   * @route DELETE /payment_statuses/:id
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
