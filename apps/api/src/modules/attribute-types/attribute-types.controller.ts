import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AttributeTypesService } from './attribute-types.service';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 * Controlador REST del módulo "attribute-types".
 * Administra los tipos de atributo (ej: "Color", "Talle") usados para
 * definir variantes de producto.
 * Ruta base: /attribute-types
 */
@ApiTags('attribute-types')
@Controller('attribute-types')
export class AttributeTypesController {
  constructor(private readonly service: AttributeTypesService) {}

  /**
   * Lista todos los tipos de atributo.
   * @route GET /attribute-types
   * @auth Público.
   * @returns Arreglo de tipos de atributo.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un tipo de atributo por su ID.
   * @route GET /attribute-types/:id
   * @auth Público.
   * @param id ID numérico validado con ParseIntPipe.
   * @returns El tipo de atributo encontrado.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /**
   * Crea un nuevo tipo de atributo.
   * @route POST /attribute-types
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param dto Datos del tipo de atributo (CreateAttributeTypeDto).
   * @returns El tipo de atributo creado (201).
   */
  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateAttributeTypeDto) {
    return this.service.create(dto);
  }

  /**
   * Actualiza parcialmente un tipo de atributo.
   * @route PATCH /attribute-types/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del tipo de atributo.
   * @param dto Campos a modificar (UpdateAttributeTypeDto).
   * @returns El tipo de atributo actualizado (200).
   */
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAttributeTypeDto) {
    return this.service.update(id, dto);
  }

  /**
   * Elimina (soft delete) un tipo de atributo.
   * @route DELETE /attribute-types/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del tipo de atributo a eliminar.
   * @returns Resultado de la operación de borrado (200).
   */
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  /**
   * Restaura un tipo de atributo previamente eliminado (soft delete).
   * @route PATCH /attribute-types/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del tipo de atributo a restaurar.
   * @returns El tipo de atributo restaurado.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
