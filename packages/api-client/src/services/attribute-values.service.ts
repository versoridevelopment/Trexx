import { apiFetch } from '../client'
import type { components } from '../types/api'

type AttributeValue = components['schemas']['AttributeValue']

export const attributeValuesService = {
  create: (data: { attribute_type_id: number; value: string }, accessToken?: string) =>
    apiFetch<AttributeValue>('/attribute-values', {
      method: 'POST',
      body: data,
      accessToken,
    }),
}
