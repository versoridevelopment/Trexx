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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

/**
 * Controlador REST del módulo "payments".
 * Administra los registros de pago asociados a una orden.
 * Ruta base: /payments
 */
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  /**
   * Crea un nuevo pago.
   * @route POST /payments
   * @auth Requiere JWT de Supabase.
   * @param dto Datos del pago (CreatePaymentDto).
   * @returns El pago creado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todos los pagos.
   * @route GET /payments
   * @auth Requiere JWT de Supabase.
   * @returns Arreglo de pagos.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un pago por su ID.
   * @route GET /payments/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del pago.
   * @returns El pago encontrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente un pago (ej: cambiar su estado).
   * @route PATCH /payments/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del pago.
   * @param dto Campos a modificar (UpdatePaymentDto).
   * @returns El pago actualizado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina un pago.
   * @route DELETE /payments/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico del pago a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
