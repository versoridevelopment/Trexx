import { apiFetch } from '../client'
import type { components } from '../types/api'

type Product = components['schemas']['Product']

type ProductCreatePayload = FormData

export const productsAdminService = {
  getColors: (accessToken?: string) =>
    apiFetch<any[]>('/products/admin/colors', {
      accessToken,
    }),

  getProductById: (id: number, accessToken?: string) =>
    apiFetch<Product>(`/products/admin/${id}`, {
      accessToken,
    }),

  getAllProducts: (accessToken?: string, includeInactive = true) =>
    apiFetch<Product[]>(`/products/admin/all?includeInactive=${includeInactive}`, {
      accessToken,
    }),

  create: (data: ProductCreatePayload, accessToken?: string) =>
    apiFetch<any>('/products', {
      method: 'POST',
      body: data,
      accessToken,
    }),

  updateProduct: (id: number, data: FormData, accessToken?: string) =>
    apiFetch<any>(`/products/${id}`, {
      method: 'PATCH',
      body: data,
      accessToken,
    }),
}
