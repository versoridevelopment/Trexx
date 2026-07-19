'use server'

import { revalidatePath } from 'next/cache'
import { productsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/server'

export async function toggleProductActiveAction(id: number, currentActive: boolean) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    return { success: false, error: 'Sesión no válida o expirada' }
  }

  try {
    if (currentActive) {
      await productsService.remove(id, session.access_token)
    } else {
      await productsService.restore(id, session.access_token)
    }

    revalidatePath('/admin/products')

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error al cambiar estado del producto' }
  }
}
