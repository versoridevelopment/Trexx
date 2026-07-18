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
    <div className="bg-[#09090b] border border-white/10 rounded-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Nombre</th>
              <th className="py-4 px-6">Slug</th>
              <th className="py-4 px-6">Descripción</th>
              <th className="py-4 px-6">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground font-bold tracking-wider uppercase">
                  No hay categorías registradas aún.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-muted-foreground">
                    #{cat.id}
                  </td>
                  <td className="py-4 px-6 font-bold text-white text-sm">
                    {cat.name}
                  </td>
                  <td className="py-4 px-6 text-trexx-volt font-mono font-bold">
                    {cat.slug}
                  </td>
                  <td className="py-4 px-6 text-muted-foreground max-w-xs truncate">
                    {cat.description || '-'}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                        cat.is_active !== false
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
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
    </div>
  )
}
