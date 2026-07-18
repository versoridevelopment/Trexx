import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

/**
 * Controlador REST del módulo "payment-methods".
 * Administra los métodos de pago disponibles (ej: tarjeta, transferencia, Mercado Pago).
 * Ruta base: /payment_methods
 */
@ApiTags('payment-methods')
@Controller('payment_methods')
export class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  /**
   * Crea un nuevo método de pago.
   * @route POST /payment_methods
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del método de pago (CreatePaymentMethodDto).
   * @returns El método de pago creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreatePaymentMethodDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los métodos de pago.
   * @route GET /payment_methods
   * @auth Público.
   * @returns Arreglo de métodos de pago.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un método de pago por su ID.
   * @route GET /payment_methods/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del método de pago.
   * @returns El método de pago encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un método de pago.
   * @route PATCH /payment_methods/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del método de pago.
   * @param dto Campos a modificar (UpdatePaymentMethodDto).
   * @returns El método de pago actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentMethodDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un método de pago.
   * @route DELETE /payment_methods/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del método de pago a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
