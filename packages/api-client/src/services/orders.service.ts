import { apiFetch } from '../client'

export const ordersService = {
  checkout: async (data: any, accessToken: string) => {
    return apiFetch('/orders/checkout', {
      method: 'POST',
      body: data,
      accessToken,
    })
  }
}
