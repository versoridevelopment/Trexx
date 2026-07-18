import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 * Controlador REST del módulo "product-variants".
 * Administra las variantes de un producto (combinaciones de atributos como
 * color/talle, cada una con su propio stock y SKU).
 * Ruta base: /product-variants
 */
@ApiTags('product-variants')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly service: ProductVariantsService) {}

  /**
   * Lista todas las variantes de producto.
   * @route GET /product-variants
   * @auth Público.
   * @returns Arreglo de variantes de producto.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene una variante de producto por su ID.
   * @route GET /product-variants/:id
   * @auth Público.
   * @param id ID numérico validado con ParseIntPipe.
   * @returns La variante encontrada.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /**
   * Crea una nueva variante de producto.
   * @route POST /product-variants
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param dto Datos de la variante (CreateProductVariantDto).
   * @returns La variante creada (201).
   */
  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateProductVariantDto) {
    return this.service.create(dto);
  }

  /**
   * Actualiza parcialmente una variante de producto.
   * @route PATCH /product-variants/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la variante.
   * @param dto Campos a modificar (UpdateProductVariantDto).
   * @returns La variante actualizada (200).
   */
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductVariantDto) {
    return this.service.update(id, dto);
  }

  /**
   * Elimina (soft delete) una variante de producto.
   * @route DELETE /product-variants/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la variante a eliminar.
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
   * Restaura una variante de producto previamente eliminada.
   * @route PATCH /product-variants/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la variante a restaurar.
   * @returns La variante restaurada.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
