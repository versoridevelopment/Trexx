import { categoriesService } from '@repo/api-client'
import { ProductCreateForm } from '@/features/admin/products/components/ProductCreateForm'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  let categories: any[] = []
  try {
    categories = await categoriesService.getAll()
  } catch (error) {
    console.error('Error loading categories:', error)
  }

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
          Nuevo Producto
        </h1>
        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
          Agregar un nuevo artículo al catálogo
        </p>
      </div>

      <ProductCreateForm categories={categories} />
    </div>
  )
}
