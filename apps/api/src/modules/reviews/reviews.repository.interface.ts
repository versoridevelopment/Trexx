export abstract class IReviewsRepository {
  abstract findByProduct(productId: number): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract findAllAdmin(includeInactive?: boolean): Promise<any[]>;
  abstract findOneAdmin(id: number): Promise<any | null>;
  abstract findUserReview(productId: number, userId: string): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract updateActiveStatus(id: number, isActive: boolean): Promise<any>;
  abstract isOwnerOrAdmin(reviewId: number, userId: string): Promise<boolean>;
}
