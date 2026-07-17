import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, ParseIntPipe, Req } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger'
import type { FastifyRequest } from 'fastify'

import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { parseMultipartRequest } from '../../common/utils/multipart'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly service: ProductsService
  ) { }

  @Get()
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por slug de categoría' })
  @ApiResponse({ status: 200, type: Product, isArray: true })
  public findAll(@Query('category') category?: string) {
    return this.service.findAll(category)
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Product })
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

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
      files,
    })
  }

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
      files,
    })
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }

  // GET /products/admin?includeInactive=true
  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAllAdmin(includeInactive === 'true')
  }

  // GET /products/admin/:id
  @Get('admin/:id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public findOneAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneAdmin(id)
  }

  // PATCH /products/:id/restore
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id)
  }
}
