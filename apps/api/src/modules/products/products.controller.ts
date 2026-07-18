import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, ParseIntPipe, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger'
import type { FastifyRequest } from 'fastify'

import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { parseMultipartRequest } from '../../common/utils/multipart'

/**
 * Controlador REST del módulo "products".
 * Es el módulo más complejo de la API: administra el catálogo de productos,
 * sus imágenes (subidas vía multipart/form-data) y sus variantes/colores.
 * Ruta base: /products
 */
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly service: ProductsService
  ) { }

  /**
   * Lista los productos activos, opcionalmente filtrados por categoría.
   * @route GET /products?category=slug
   * @auth Público.
   * @param category Slug de la categoría por la cual filtrar (opcional).
   * @returns Arreglo de Product (200).
   */
  @Get()
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por slug de categoría' })
  @ApiResponse({ status: 200, type: Product, isArray: true })
  public findAll(@Query('category') category?: string) {
    return this.service.findAll(category)
  }

  /**
   * Obtiene un producto por su ID numérico.
   * @route GET /products/:id
   * @auth Público.
   * @param id ID numérico del producto (ParseIntPipe).
   * @returns El Product encontrado (200).
   */
  @Get(':id')
  @ApiResponse({ status: 200, type: Product })
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  /**
   * Obtiene un producto por su slug (identificador amigable para URLs/SEO).
   * @route GET /products/slug/:slug
   * @auth Público.
   * @param slug Slug del producto.
   * @returns El Product encontrado (200).
   */
  @Get('slug/:slug')
  @ApiResponse({ status: 200, type: Product })
  public findOneBySlug(@Param('slug') slug: string) {
    return this.service.findOneBySlug(slug)
  }

  /**
   * Crea un nuevo producto, incluyendo la subida de imágenes.
   * Recibe el request crudo (multipart/form-data) y lo parsea manualmente
   * con parseMultipartRequest para separar campos de texto (fields) de
   * archivos (files), dado que se usa Fastify en lugar del interceptor
   * estándar de Nest para multipart.
   * @route POST /products
   * @auth Requiere JWT de Supabase + rol "admin".
   * @body multipart/form-data:
   *   - name (string, requerido): nombre del producto.
   *   - price (number, requerido): precio del producto.
   *   - category_id (integer, requerido): ID de la categoría.
   *   - description (string, opcional): descripción del producto.
   *   - parent_id (integer, opcional): ID del producto padre (para variantes agrupadas).
   *   - color_id (integer, opcional): ID del color principal.
   *   - slug (string, opcional): slug para SEO.
   *   - variants (string, opcional): variantes serializadas en JSON.
   *   - images (array de binarios, requerido): archivos de imagen del producto.
   * @param req FastifyRequest crudo, usado para parsear el multipart manualmente.
   * @returns El Product creado.
   */
  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nombre del producto' },
        price: { type: 'number', description: 'Precio del producto' },
        category_id: { type: 'integer', description: 'ID de la categoría' },
        description: { type: 'string', description: 'Descripción opcional del producto' },
        parent_id: { type: 'integer', description: 'ID del producto padre' },
        color_id: { type: 'integer', description: 'ID del color principal' },
        slug: { type: 'string', description: 'Slug para SEO' },
        variants: { type: 'string', description: 'Variantes serializadas en JSON' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Archivos de imagen del producto',
        },
      },
      required: ['name', 'price', 'category_id', 'images'],
    },
  })
  public async create(@Req() req: FastifyRequest) {
    const { fields, files } = await parseMultipartRequest(req)

    return this.service.create({
      name: fields.name,
      priceStr: fields.price,
      categoryIdStr: fields.category_id,
      description: fields.description,
      parentIdStr: fields.parent_id,
      colorIdStr: fields.color_id,
      slug: fields.slug,
      variantsStr: fields.variants,
      files,
    })
  }

  /**
   * Actualiza parcialmente un producto, incluyendo el reemplazo opcional de
   * sus imágenes. Al igual que create(), parsea el multipart manualmente.
   * @route PATCH /products/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del producto a actualizar (ParseIntPipe).
   * @body multipart/form-data (todos los campos son opcionales):
   *   - name, price, category_id, description, parent_id, color_id, slug: igual que en create().
   *   - variants: variantes serializadas en JSON.
   *   - images: nuevos archivos de imagen que reemplazan a los existentes.
   * @param req FastifyRequest crudo, usado para parsear el multipart manualmente.
   * @returns El Product actualizado.
   */
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nuevo nombre del producto' },
        price: { type: 'number', description: 'Nuevo precio del producto' },
        category_id: { type: 'integer', description: 'Nuevo ID de la categoría' },
        description: { type: 'string', description: 'Nueva descripción opcional del producto' },
        parent_id: { type: 'integer', description: 'Nuevo ID del producto padre' },
        color_id: { type: 'integer', description: 'Nuevo ID del color principal' },
        slug: { type: 'string', description: 'Nuevo slug' },
        variants: { type: 'string', description: 'Nuevas variantes serializadas en JSON' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Nuevos archivos de imagen del producto a reemplazar',
        },
      },
    },
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: FastifyRequest
  ) {
    const { fields, files } = await parseMultipartRequest(req)

    return this.service.update(id, {
      name: fields.name,
      priceStr: fields.price,
      categoryIdStr: fields.category_id,
      description: fields.description,
      parentIdStr: fields.parent_id,
      colorIdStr: fields.color_id,
      slug: fields.slug,
      files,
    })
  }

  /**
   * Elimina (soft delete) un producto.
   * @route DELETE /products/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del producto a eliminar (ParseIntPipe).
   * @returns Resultado de la operación de borrado.
   */
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }

  // GET /products/admin/colors
  /**
   * Lista todos los colores disponibles para productos (uso administrativo,
   * por ejemplo para poblar un selector al crear/editar un producto).
   * @route GET /products/admin/colors
   * @auth Requiere JWT de Supabase + rol "admin".
   * @returns Arreglo de colores.
   */
  @Get('admin/colors')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public findAllColors() {
    return this.service.findAllColors()
  }

  // GET /products/admin?includeInactive=true
  /**
   * Lista todos los productos para administración, incluyendo opcionalmente
   * los inactivos/eliminados.
   * @route GET /products/admin/all?includeInactive=true|false
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param includeInactive Query param string ('true'/'false') para incluir inactivos.
   * @returns Arreglo de productos.
   */
  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAllAdmin(includeInactive === 'true')
  }

  // GET /products/admin/:id
  /**
   * Obtiene un producto por ID para administración (incluye datos/estado que
   * no se exponen en el findOne público, ej. productos inactivos).
   * @route GET /products/admin/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del producto (ParseIntPipe).
   * @returns El producto encontrado, con visibilidad administrativa.
   */
  @Get('admin/:id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public findOneAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneAdmin(id)
  }

  // PATCH /products/:id/restore
  /**
   * Restaura un producto previamente eliminado (soft delete).
   * @route PATCH /products/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico del producto a restaurar (ParseIntPipe).
   * @returns El producto restaurado.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id)
  }
}
