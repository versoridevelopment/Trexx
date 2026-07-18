import { apiFetch } from '../client'
import type { components } from '../types/api'

type Review = components['schemas']['Review']
type CreateReviewDto = components['schemas']['CreateReviewDto']

export const reviewsService = {
  getByProduct: (productId: number) =>
    apiFetch<Review[]>(`/api/reviews/product/${productId}`),

  create: (accessToken: string, data: CreateReviewDto) =>
    apiFetch<Review>('/api/reviews', {
      accessToken,
      method: 'POST',
      body: data,
    }),

  remove: (accessToken: string, id: number) =>
    apiFetch<void>(`/api/reviews/${id}`, {
      accessToken,
      method: 'DELETE',
    }),
}
