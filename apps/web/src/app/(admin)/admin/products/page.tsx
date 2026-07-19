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
    products = await productsService.getAllAdmin(token, true)
  } catch (error) {
    console.error('Error fetching admin products:', error)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
            Gestión de Productos
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
            {products.length} producto{products.length !== 1 ? 's' : ''} registrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-trexx-red text-white hover:bg-red-700 font-bold tracking-wider uppercase text-xs gap-2 shadow-sm">
            <Plus size={15} />
            <span>Nuevo Producto</span>
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ProductAdminTable initialProducts={products} />
      </div>
    </div>
  )
}
