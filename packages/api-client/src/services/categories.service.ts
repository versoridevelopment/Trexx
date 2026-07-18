import { apiFetch } from '../client'
import type { components } from '../types/api'

type Category = components['schemas']['Category']

export const categoriesService = {
  getAll: () =>
    apiFetch<Category[]>('/api/categories'),

  getBySlug: (slug: string) =>
    apiFetch<Category>(`/api/categories/${slug}`),

  create: (data: { name: string; slug: string; description?: string }, accessToken?: string) =>
    apiFetch<Category>('/api/categories', {
      method: 'POST',
      body: data,
      accessToken,
    }),
}
