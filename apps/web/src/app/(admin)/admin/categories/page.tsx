import { categoriesService } from '@repo/api-client'
import { CategoryTable } from '@/features/admin/categories/components/CategoryTable'
import { CategoryCreateDialog } from '@/features/admin/categories/components/CategoryCreateDialog'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  let categories: any[] = []
  try {
    categories = await categoriesService.getAll()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Categorías
          </h1>
          <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
            Rubros del Catálogo ({categories.length} categorías)
          </p>
        </div>

        <CategoryCreateDialog />
      </div>

      {/* Category Table */}
      <CategoryTable categories={categories} />
    </div>
  )
}
