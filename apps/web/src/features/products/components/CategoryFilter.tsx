'use client'

import { useRouter } from 'next/navigation'
import type { Category } from '../types/product.types'

interface CategoryFilterProps {
  categories: Category[]
  selected?: string
}

export function CategoryFilter({ categories, selected }: CategoryFilterProps) {
  const router = useRouter()

  const handleFilter = (slug?: string) => {
    if (slug) {
      router.push(`/shop?category=${slug}`)
    } else {
      router.push('/shop')
    }
  }

  return (
    <aside className="w-full space-y-6 animate-enter">
      <div>
        <h3 className="text-xs font-black tracking-[0.25em] uppercase text-white mb-4 pb-2 border-b border-white/10">
          Categorías
        </h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => handleFilter()}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-between group ${
                !selected
                  ? 'bg-trexx-volt text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Todo el Catálogo</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${!selected ? 'bg-black/20 text-black' : 'text-muted-foreground group-hover:text-white'}`}>
                •
              </span>
            </button>
          </li>
          
          {categories.map((cat) => {
            const isActive = selected === cat.slug
            return (
              <li key={cat.id}>
                <button
                  onClick={() => handleFilter(cat.slug)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-trexx-volt text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-black' : 'text-muted-foreground group-hover:text-white'}`}>
                    •
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
