import { apiFetch } from '../client'
import type { components } from '../types/api'

type AttributeType = components['schemas']['AttributeType']

export const attributeTypesService = {
  getAll: () =>
    apiFetch<AttributeType[]>('/api/attribute-types'),

  getById: (id: number) =>
    apiFetch<AttributeType>(`/api/attribute-types/${id}`),

  create: (data: { name: string; slug?: string }) =>
    apiFetch<AttributeType>('/api/attribute-types', {
      method: 'POST',
      body: data,
    }),
}
