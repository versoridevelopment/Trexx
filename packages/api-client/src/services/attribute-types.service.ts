import { apiFetch } from '../client'
import type { components } from '../types/api'

type AttributeType = components['schemas']['AttributeType']

export const attributeTypesService = {
  getAll: () =>
    apiFetch<AttributeType[]>('/attribute-types'),

  getById: (id: number) =>
    apiFetch<AttributeType>(`/attribute-types/${id}`),

  create: (data: { name: string; slug?: string }) =>
    apiFetch<AttributeType>('/attribute-types', {
      method: 'POST',
      body: data,
    }),
}
