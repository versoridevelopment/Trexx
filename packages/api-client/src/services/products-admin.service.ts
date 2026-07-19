import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

type ProductCreatePayload = FormData

export const productsAdminService = {
  getColors: (accessToken?: string) =>
    apiFetch<any[]>('/api/products/admin/colors', {
      accessToken,
    }),

  getProductById: (id: number, accessToken?: string) =>
    apiFetch<Product>(`/api/products/admin/${id}`, {
      accessToken,
    }),

  getAllProducts: (accessToken?: string, includeInactive = true) =>
    apiFetch<Product[]>(`/api/products/admin/all?includeInactive=${includeInactive}`, {
      accessToken,
    }),

  create: (data: ProductCreatePayload, accessToken?: string) =>
    apiFetch<any>('/api/products', {
      method: 'POST',
      body: data,
      accessToken,
    }),

  updateProduct: (id: number, data: FormData, accessToken?: string) =>
    apiFetch<any>(`/api/products/${id}`, {
      method: 'PATCH',
      body: data,
      accessToken,
    }),
}
