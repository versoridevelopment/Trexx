import { apiFetch } from '../client'
import type { components } from '../types/api'

type Category = components['schemas']['Category']

export const categoriesService = {
  getAll: () =>
    apiFetch<Category[]>('/categories'),

  getBySlug: (slug: string) =>
    apiFetch<Category>(`/categories/${slug}`),

  create: (data: { name: string; slug: string; description?: string }, accessToken?: string) =>
    apiFetch<Category>('/categories', {
      method: 'POST',
      body: data,
      accessToken,
    }),
}
