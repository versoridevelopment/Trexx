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
    <div className="space-y-8 animate-enter">
      <div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
          Nuevo Producto
        </h1>
        <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
          Agregar un nuevo artículo al catálogo
        </p>
      </div>

      <ProductCreateForm categories={categories} />
    </div>
  )
}
