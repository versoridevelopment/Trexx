import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { IReviewsRepository } from './reviews.repository.interface';
import { ReviewsRepository } from './reviews.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    { provide: IReviewsRepository, useClass: ReviewsRepository },
  ],
  exports: [ReviewsService],
})
export class ReviewsModule {}
