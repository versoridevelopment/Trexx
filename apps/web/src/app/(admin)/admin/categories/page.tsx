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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
            Categorías
          </h1>
          <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
            {categories.length} categoría{categories.length !== 1 ? 's' : ''} registrada{categories.length !== 1 ? 's' : ''}
          </p>
        </div>

        <CategoryCreateDialog />
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CategoryTable categories={categories} />
      </div>
    </div>
  )
}
