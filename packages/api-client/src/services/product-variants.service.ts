import { apiFetch } from '../client'
import type { components } from '../types/api'

type ProductVariant = components['schemas']['ProductVariant']
type NormalizedProductVariant = Omit<ProductVariant, 'sku' | 'price_modifier'> & {
  sku: string | null
  price_modifier: number | null
}

export const productVariantsService = {
  getAll: () =>
    apiFetch<ProductVariant[]>('/api/product-variants'),

  create: (data: {
    product_id: number
    sku?: string
    price?: number
    stock: number
    attribute_value_ids?: number[]
  }) =>
    apiFetch<NormalizedProductVariant>('/api/product-variants', {
      method: 'POST',
      body: data,
    }),

  update: (
    id: number,
    data: { sku: string; stock: number; price_modifier: number },
    accessToken?: string
  ) =>
    apiFetch<NormalizedProductVariant>(`/api/product-variants/${id}`, {
      method: 'PATCH',
      body: data,
      accessToken,
    }),

  restore: (id: number, accessToken?: string) =>
    apiFetch<NormalizedProductVariant>(`/api/product-variants/${id}/restore`, {
      method: 'PATCH',
      accessToken,
    }),

  remove: (id: number, accessToken?: string) =>
    apiFetch<void>(`/api/product-variants/${id}`, {
      method: 'DELETE',
      accessToken,
    }),
}
