import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewOwnerOrAdminGuard } from './guards/review-owner-or-admin.guard';

/**
 * Controlador REST del módulo "reviews".
 * Administra las reseñas (calificación + comentario) que los usuarios dejan
 * sobre los productos.
 * Ruta base: /reviews
 */
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  // PÚBLICO — reseñas de un producto
  /**
   * Lista las reseñas de un producto puntual.
   * @route GET /reviews/product/:productId
   * @auth Público.
   * @param productId ID del producto (ParseIntPipe).
   * @returns Arreglo de Review pertenecientes al producto.
   */
  @Get('product/:productId')
  @ApiQuery({
    name: 'productId',
    required: true,
    description: 'ID del producto',
  })
  @ApiResponse({ status: 200, type: Review, isArray: true })
  findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.service.findByProduct(productId);
  }

  // PROTEGIDO — crear reseña
  /**
   * Crea una reseña para el usuario autenticado.
   * @route POST /reviews
   * @auth Requiere JWT de Supabase.
   * @param dto Datos de la reseña (CreateReviewDto: producto, rating, comentario).
   * @param user Usuario autenticado inyectado por @CurrentUser(); se usa user.sub como autor.
   * @returns La reseña creada (201).
   */
  @Post()
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Review })
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.sub);
  }
  // PROTEGIDO — eliminar reseña propia o admin
  /**
   * Elimina una reseña. Autorizado mediante ReviewOwnerOrAdminGuard.
   * @route DELETE /reviews/:id
   * @auth Requiere JWT de Supabase + ser creador de la reseña o administrador.
   * @param id ID de la reseña (ParseIntPipe).
   * @returns Resultado de la operación de borrado.
   */
  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, ReviewOwnerOrAdminGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  /**
   * Lista todas las reseñas para administración, incluyendo opcionalmente
   * las inactivas/eliminadas.
   * @route GET /reviews/admin/all?includeInactive=true|false
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param includeInactive Query param string ('true'/'false') para incluir inactivas.
   * @returns Arreglo de reseñas.
   */
  @Get('admin/all')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAllAdmin(@Query('includeInactive') includeInactive?: string) {
    return this.service.findAllAdmin(includeInactive === 'true');
  }

  /**
   * Restaura una reseña previamente eliminada (soft delete).
   * @route PATCH /reviews/:id/restore
   * @auth Requiere JWT de Supabase + rol "admin".
   * @param id ID de la reseña a restaurar (ParseIntPipe).
   * @returns La reseña restaurada.
   */
  @Patch(':id/restore')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
