import { apiFetch } from '../client'
import type { components } from '../types/api'

type User = components['schemas']['User']
type UpdateUserDto = components['schemas']['UpdateUserDto']

export const usersService = {
  getMe: (accessToken: string) =>
    apiFetch<User>('/users/me', { accessToken }),

  updateMe: (accessToken: string, data: UpdateUserDto) =>
    apiFetch<User>('/users/me', {
      accessToken,
      method: 'PATCH',
      body: data,
    }),
}
