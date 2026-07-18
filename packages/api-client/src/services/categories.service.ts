import { apiFetch } from '../client'
import type { components } from '../types/api'

type Category = components['schemas']['Category']

export const categoriesService = {
  getAll: () =>
    apiFetch<Category[]>('/api/categories'),

  getAllAdmin: (includeInactive = true) =>
    apiFetch<Category[]>(`/api/categories/admin/all?includeInactive=${includeInactive}`),

  getBySlug: (slug: string) =>
    apiFetch<Category>(`/api/categories/${slug}`),
}
