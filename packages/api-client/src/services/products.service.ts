import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

export const productsService = {
  // Public endpoints
  getAll: (categorySlug?: string) =>
    apiFetch<Product[]>(
      categorySlug
        ? `/api/products?category=${categorySlug}`
        : '/api/products'
    ),

  getById: (id: number) =>
    apiFetch<Product>(`/api/products/${id}`),

  getBySlug: (slug: string) =>
    apiFetch<Product>(`/api/products/slug/${slug}`),

  // Admin endpoints
  create: (data: FormData, accessToken: string) =>
    apiFetch<any>('/api/products', {
      method: 'POST',
      body: data,
      accessToken
    }),

  update: (id: number, data: FormData, accessToken: string) =>
    apiFetch<any>(`/api/products/${id}`, {
      method: 'PATCH',
      body: data,
      accessToken
    }),

  remove: (id: number, accessToken: string) =>
    apiFetch<any>(`/api/products/${id}`, {
      method: 'DELETE',
      accessToken
    }),
}
