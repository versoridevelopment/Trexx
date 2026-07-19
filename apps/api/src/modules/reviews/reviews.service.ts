import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { IReviewsRepository } from './reviews.repository.interface';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly repository: IReviewsRepository) { }

  // Público: solo activas
  findByProduct(productId: number) {
    return this.repository.findByProduct(productId);
  }

  async findOne(id: number) {
    const record = await this.repository.findOne(id);
    if (!record || !record.is_active) {
      throw new NotFoundException(`Review #${id} not found`);
    }
    return record;
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.repository.findAllAdmin(includeInactive);
  }

  // Admin / User findOne
  async findOneAdmin(id: number) {
    const record = await this.repository.findOneAdmin(id);
    if (!record) throw new NotFoundException(`Review #${id} not found`);
    return record;
  }

  // Verificar si el usuario ya reseñó el producto
  async findUserReview(productId: number, userId: string) {
    return this.repository.findUserReview(productId, userId);
  }

  async create(dto: CreateReviewDto, userId: string) {
    const existing = await this.findUserReview(dto.product_id, userId);
    if (existing) {
      throw new ConflictException('Ya reseñaste este producto');
    }
    return this.repository.create({
      product_id: dto.product_id,
      user_id: userId,
      rating: dto.rating,
      comment: dto.comment ?? null,
    });
  }

  // Soft delete (autorización pre-validada por ReviewOwnerOrAdminGuard)
  async remove(id: number) {
    await this.findOneAdmin(id);
    return this.repository.updateActiveStatus(id, false);
  }

  async restore(id: number) {
    const review = await this.findOneAdmin(id);
    if (review.is_active) throw new BadRequestException(`Review #${id} is already active`);
    return this.repository.updateActiveStatus(id, true);
  }
}
