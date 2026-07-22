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
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

/**
 * Controlador REST del módulo "provinces".
 * Administra las provincias utilizadas en direcciones de envío/facturación.
 * Ruta base: /provinces
 */
@ApiTags('provinces')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly service: ProvincesService) {}

  /**
   * Crea una nueva provincia.
   * @route POST /provinces
   * @auth Requiere JWT de Supabase.
   * @param dto Datos de la provincia (CreateProvinceDto).
   * @returns La provincia creada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateProvinceDto) {
    return this.service.create(dto);
  }

  /**
   * Lista todas las provincias.
   * @route GET /provinces
   * @auth Público.
   * @returns Arreglo de provincias.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene una provincia por su ID.
   * @route GET /provinces/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la provincia.
   * @returns La provincia encontrada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  /**
   * Actualiza parcialmente una provincia.
   * @route PATCH /provinces/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la provincia.
   * @param dto Campos a modificar (UpdateProvinceDto).
   * @returns La provincia actualizada.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProvinceDto) {
    return this.service.update(Number(id), dto);
  }

  /**
   * Elimina una provincia.
   * @route DELETE /provinces/:id
   * @auth Requiere JWT de Supabase.
   * @param id ID numérico de la provincia a eliminar.
   * @returns Resultado de la operación de borrado.
   */
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
