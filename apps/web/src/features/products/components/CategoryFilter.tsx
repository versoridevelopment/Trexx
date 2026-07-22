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
    <aside className="w-full animate-enter md:space-y-6">
      <div>
        <h3 className="hidden md:block text-xs font-black tracking-[0.25em] uppercase text-white mb-4 pb-2 border-b border-white/10">
          Categorías
        </h3>
        <ul className="flex overflow-x-auto md:flex-col gap-2 md:gap-0 md:space-y-1.5 pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <li className="shrink-0">
            <button
              onClick={() => handleFilter()}
              className={`w-full whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-between gap-3 group ${
                !selected
                  ? 'bg-trexx-volt text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                  : 'bg-white/5 md:bg-transparent text-muted-foreground hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Todo el Catálogo</span>
              <span className={`hidden md:inline-block text-[9px] px-1.5 py-0.5 rounded ${!selected ? 'bg-black/20 text-black' : 'text-muted-foreground group-hover:text-white'}`}>
                •
              </span>
            </button>
          </li>
          
          {categories.map((cat) => {
            const isActive = selected === cat.slug
            return (
              <li key={cat.id} className="shrink-0">
                <button
                  onClick={() => handleFilter(cat.slug)}
                  className={`w-full whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-between gap-3 group ${
                    isActive
                      ? 'bg-trexx-volt text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.25)]'
                      : 'bg-white/5 md:bg-transparent text-muted-foreground hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`hidden md:inline-block text-[9px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-black' : 'text-muted-foreground group-hover:text-white'}`}>
                    •
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  )
}
