import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitysService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

/**
 * Controlador REST del módulo "cities".
 * Expone el CRUD de ciudades utilizadas para direcciones de envío/facturación.
 * Ruta base: /cities
 */
@ApiTags('cities')
@Controller('cities')
export class CitysController {
  constructor(private readonly service: CitysService) {}

  /**
   * Crea una nueva ciudad.
   * @route POST /cities
   * @auth Requiere JWT de Supabase (cualquier usuario autenticado).
   * @param dto Datos de la ciudad a crear (CreateCityDto).
   * @returns La ciudad creada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateCityDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todas las ciudades.
   * @route GET /cities
   * @auth Público, no requiere autenticación.
   * @returns Arreglo con todas las ciudades activas.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene una ciudad por su ID.
   * @route GET /cities/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la ciudad.
   * @returns La ciudad encontrada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente una ciudad existente.
   * @route PATCH /cities/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la ciudad a actualizar.
   * @param dto Campos a modificar (UpdateCityDto).
   * @returns La ciudad actualizada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina (soft delete) una ciudad.
   * @route DELETE /cities/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la ciudad a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
