import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IReviewsRepository } from './reviews.repository.interface';

@Injectable()
export class ReviewsRepository implements IReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Público: solo activas
  findByProduct(productId: number) {
    return this.prisma.reviews.findMany({
      where: { product_id: productId, is_active: true },
      include: {
        users: { select: { id: true, name: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.reviews.findUnique({
      where: { id },
      include: { users: { select: { id: true, name: true } } },
    });
  }

  // Admin: todas
  findAllAdmin(includeInactive = false) {
    return this.prisma.reviews.findMany({
      where: includeInactive ? {} : { is_active: true },
      include: {
        users: { select: { id: true, name: true } },
        products: { select: { id: true, name: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOneAdmin(id: number) {
    return this.prisma.reviews.findUnique({ where: { id } });
  }

  // Verificar si el usuario ya reseñó el producto
  findUserReview(productId: number, userId: string) {
    return this.prisma.reviews.findUnique({
      where: {
        product_id_user_id: {
          product_id: productId,
          user_id: userId,
        },
      },
    });
  }

  create(data: any) {
    return this.prisma.reviews.create({
      data,
      include: {
        users: { select: { id: true, name: true } },
      },
    });
  }

  updateActiveStatus(id: number, isActive: boolean) {
    return this.prisma.reviews.update({
      where: { id },
      data: { is_active: isActive },
    });
  }

  async isOwnerOrAdmin(reviewId: number, userId: string): Promise<boolean> {
    const review = await this.prisma.reviews.findUnique({
      where: { id: reviewId },
      select: { user_id: true },
    });

    if (!review) return false;
    if (review.user_id === userId) return true;

    const adminRoleCount = await this.prisma.user_roles.count({
      where: {
        user_id: userId,
        roles: { name: 'admin' },
      },
    });

    return adminRoleCount > 0;
  }
}
