import { apiFetch } from '../client'
import type { components } from '../types/api'

type ProductVariant = components['schemas']['ProductVariant']

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
    apiFetch<ProductVariant>('/api/product-variants', {
      method: 'POST',
      body: data,
    }),
}
