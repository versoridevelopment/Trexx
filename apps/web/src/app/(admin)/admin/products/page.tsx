import { productsService } from '@repo/api-client'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductAdminTable } from '@/features/admin/products/components/ProductAdminTable'

import { createClient } from '@/shared/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let products: any[] = []
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token || ''

    // getAllAdmin(token, true) obtiene productos activos e inactivos con token
    products = await productsService.getAllAdmin(token, true)
  } catch (error) {
    console.error('Error fetching admin products:', error)
  }

  return (
    <div className="space-y-8 animate-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Gestión de Productos
          </h1>
          <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
            Catálogo ({products.length} productos registrados)
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold tracking-wider uppercase text-xs gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            <Plus size={16} />
            <span>Nuevo Producto</span>
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <ProductAdminTable initialProducts={products} />
    </div>
  )
}
