'use server'

import { revalidatePath } from 'next/cache'
import { productsAdminService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/server'

export async function updateProductAction(id: number, formData: FormData) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.access_token) {
    return { success: false, error: 'Sesión no válida o expirada' }
  }

  try {
    const updated = await productsAdminService.updateProduct(id, formData, session.access_token)
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}/edit`)
    return { success: true, updated }
  } catch (error: any) {
    return { success: false, error: error.message || 'Error al actualizar el producto' }
  }
}
