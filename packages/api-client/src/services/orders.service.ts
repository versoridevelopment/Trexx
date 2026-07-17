import { apiFetch } from '../client'

export const ordersService = {
  checkout: async (data: any, accessToken: string) => {
    return apiFetch('/api/orders/checkout', {
      method: 'POST',
      body: data,
      accessToken,
    })
  }
}
