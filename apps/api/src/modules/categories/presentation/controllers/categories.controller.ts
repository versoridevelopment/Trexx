import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { Category as CategoryEntity } from '../../domain/entities/category.entity'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { SupabaseAuthGuard } from '../../../auth/supabase-auth.guard'
import { RolesGuard } from '../../../auth/guards/roles.guard'
import { Roles } from '../../../auth/decorators/roles.decorator'

// Use Cases
import { GetAllCategoriesUseCase } from '../../application/use-cases/get-all-categories.use-case'
import { GetOneCategoryUseCase } from '../../application/use-cases/get-one-category.use-case'
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case'
import { UpdateCategoryUseCase } from '../../application/use-cases/update-category.use-case'
import { RemoveCategoryUseCase } from '../../application/use-cases/remove-category.use-case'
import { RestoreCategoryUseCase } from '../../application/use-cases/restore-category.use-case'

/**
 * Controlador REST del módulo "categories".
 * Implementado con Clean Architecture / hexagonal: el controlador no habla
 * directamente con un servicio o repositorio, sino que delega cada operación
 * a un Use Case específico (uno por caso de uso).
 * Ruta base: /categories
 */
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly getAllUseCase: GetAllCategoriesUseCase,
    private readonly getOneUseCase: GetOneCategoryUseCase,
    private readonly createUseCase: CreateCategoryUseCase,
    private readonly updateUseCase: UpdateCategoryUseCase,
    private readonly removeUseCase: RemoveCategoryUseCase,
    private readonly restoreUseCase: RestoreCategoryUseCase
  ) {}

  /**
   * Lista todas las categorías activas.
   * @route GET /categories
   * @auth Público.
   * @returns Arreglo de CategoryEntity (200).
   */
  @Get()
  @ApiResponse({ status: 200, type: CategoryEntity, isArray: true })
  findAll() {
    return this.getAllUseCase.execute()
  }

  /**
   * Obtiene una categoría por su slug (identificador amigable para URLs).
   * @route GET /categories/:slug
   * @auth Público.
   * @param slug Slug de la categoría.
   * @returns La CategoryEntity encontrada (200).
   */
  @Get(':slug')
  @ApiResponse({ status: 200, type: CategoryEntity })
  findBySlug(@Param('slug') slug: string) {
    return this.getOneUseCase.execute(slug)
  }

  /**
   * Crea una nueva categoría.
   * @route POST /categories
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param dto Datos de la categoría (CreateCategoryDto).
   * @returns La CategoryEntity creada (201).
   */
  @Post()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: CategoryEntity })
  create(@Body() dto: CreateCategoryDto) {
    return this.createUseCase.execute(dto)
  }

  /**
   * Actualiza parcialmente una categoría.
   * @route PATCH /categories/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la categoría (ParseIntPipe).
   * @param dto Campos a modificar (UpdateCategoryDto).
   * @returns La CategoryEntity actualizada (200).
   */
  @Patch(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: CategoryEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.updateUseCase.execute(id, dto)
  }

  /**
   * Elimina (soft delete) una categoría.
   * @route DELETE /categories/:id
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la categoría a eliminar (ParseIntPipe).
   * @returns Resultado de la operación de borrado (200).
   */
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.removeUseCase.execute(id)
  }

  /**
   * Lista todas las categorías para administración, incluyendo opcionalmente
   * las inactivas/eliminadas.
   * @route GET /categories/admin/all?includeInactive=true|false
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param includeInactive Query param string ('true'/'false') para incluir inactivas.
   * @returns Arreglo de CategoryEntity.
   */
  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.getAllUseCase.execute(includeInactive === 'true')
  }

  /**
   * Restaura una categoría previamente eliminada (soft delete).
   * @route PATCH /categories/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID numérico de la categoría a restaurar (ParseIntPipe).
   * @returns La categoría restaurada.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.restoreUseCase.execute(id)
  }
}
