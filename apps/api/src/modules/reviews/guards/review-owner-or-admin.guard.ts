import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { IReviewsRepository } from '../reviews.repository.interface';

@Injectable()
export class ReviewOwnerOrAdminGuard implements CanActivate {
  constructor(private readonly reviewsRepository: IReviewsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    if (!userId) {
      throw new ForbiddenException('No autorizado');
    }

    const reviewId = Number(request.params.id);
    if (isNaN(reviewId)) {
      throw new ForbiddenException('ID de reseña inválido');
    }

    const isAllowed = await this.reviewsRepository.isOwnerOrAdmin(
      reviewId,
      userId,
    );
    if (!isAllowed) {
      throw new ForbiddenException(
        'No tienes permiso para realizar esta acción sobre esta reseña',
      );
    }

    return true;
  }
}
