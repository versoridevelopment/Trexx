'use server'

import { revalidatePath } from 'next/cache'
import { productVariantsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/server'

export async function updateProductVariantAction(
  id: number,
  data: { sku?: string; stock?: number; price_modifier?: number }
) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    return { success: false, error: 'Sesión no válida o expirada' }
  }

  try {
    const updated = await productVariantsService.update(id, data, session.access_token)
    revalidatePath('/admin/products')
    return { success: true, updated }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error al actualizar la variante' }
  }
}

export async function toggleVariantActiveAction(id: number, currentActive: boolean) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    return { success: false, error: 'Sesión no válida o expirada' }
  }

  try {
    if (currentActive) {
      await productVariantsService.remove(id, session.access_token)
    } else {
      await productVariantsService.restore(id, session.access_token)
    }
    revalidatePath('/admin/products')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error al cambiar estado de la variante' }
  }
}
