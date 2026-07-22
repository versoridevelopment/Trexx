import { CurrentUser } from '../auth/decorators/current-user.decorator';
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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

/**
 * Controlador REST del módulo "addresses".
 * Gestiona las direcciones (de envío/facturación) asociadas a los usuarios.
 * Ruta base: /addresses
 */
@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  /**
   * Devuelve las direcciones del usuario autenticado.
   * @route GET /addresses/me
   * @auth Requiere JWT de Supabase.
   * @param user Usuario actual inyectado por el decorador @CurrentUser().
   * @returns Lista de direcciones del usuario, o [] si el servicio no implementa findMe.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  findMe(@CurrentUser() user: { id: string }) {
    return (this.service as any).findMe
      ? (this.service as any).findMe(user.id)
      : [];
  }
  constructor(private readonly service: AddressesService) {}

  /**
   * Crea una nueva dirección.
   * @route POST /addresses
   * @auth Requiere JWT de Supabase.
   * @param dto Datos de la dirección a crear (CreateAddressDto).
   * @returns La dirección creada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todas las direcciones.
   * @route GET /addresses
   * @auth Público, no requiere autenticación.
   * @returns Arreglo con todas las direcciones.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene una dirección por su ID.
   * @route GET /addresses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la dirección.
   * @returns La dirección encontrada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente una dirección existente.
   * @route PATCH /addresses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la dirección.
   * @param dto Campos a modificar (UpdateAddressDto).
   * @returns La dirección actualizada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAddressDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina (soft delete) una dirección.
   * @route DELETE /addresses/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la dirección a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
