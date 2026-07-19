interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  is_active?: boolean
}

interface CategoryTableProps {
  categories: Category[]
}

export function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
            <th className="py-4 px-5">ID</th>
            <th className="py-4 px-5">Nombre</th>
            <th className="py-4 px-5">Slug</th>
            <th className="py-4 px-5">Descripción</th>
            <th className="py-4 px-5">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-16 text-center text-gray-400 font-semibold tracking-wider uppercase">
                No hay categorías registradas aún.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5 font-mono font-bold text-gray-400">
                  #{cat.id}
                </td>
                <td className="py-4 px-5 font-bold text-gray-900 text-sm">
                  {cat.name}
                </td>
                <td className="py-4 px-5">
                  <span className="font-mono font-bold text-trexx-red bg-red-50 border border-red-100 px-2 py-0.5 rounded-full text-[10px]">
                    {cat.slug}
                  </span>
                </td>
                <td className="py-4 px-5 text-gray-500 max-w-xs truncate">
                  {cat.description || '-'}
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                      cat.is_active !== false
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-trexx-red border-red-200'
                    }`}
                  >
                    {cat.is_active !== false ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
