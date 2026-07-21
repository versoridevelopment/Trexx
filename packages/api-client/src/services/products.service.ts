import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

export const productsService = {
  // Public endpoints
  getAll: (categorySlug?: string) =>
    apiFetch<Product[]>(
      categorySlug
        ? `/products?category=${categorySlug}`
        : '/products'
    ),

  getById: (id: number) =>
    apiFetch<Product>(`/products/${id}`),

  getBySlug: (slug: string) =>
    apiFetch<Product>(`/products/slug/${slug}`),

  // Admin endpoints
  getAllAdmin: (accessToken: string, includeInactive = true) =>
    apiFetch<Product[]>(`/products/admin/all?includeInactive=${includeInactive}`, {
      accessToken,
    }),

  getByIdAdmin: (id: number, accessToken: string) =>
    apiFetch<Product>(`/products/admin/${id}`, {
      accessToken,
    }),

  create: (data: FormData, accessToken: string) =>
    apiFetch<any>('/products', {
      method: 'POST',
      body: data,
      accessToken
    }),

  update: (id: number, data: FormData, accessToken: string) =>
    apiFetch<any>(`/products/${id}`, {
      method: 'PATCH',
      body: data,
      accessToken
    }),

  remove: (id: number, accessToken: string) =>
    apiFetch<any>(`/products/${id}`, {
      method: 'DELETE',
      accessToken
    }),

  restore: (id: number, accessToken: string) =>
    apiFetch<any>(`/products/${id}/restore`, {
      method: 'PATCH',
      accessToken
    }),
}
