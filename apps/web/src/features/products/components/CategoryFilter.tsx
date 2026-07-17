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
    <div className="w-full flex flex-wrap items-center gap-3 animate-enter">
      <button
        onClick={() => handleFilter()}
        className={`px-6 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 border ${
          !selected
            ? 'border-trexx-volt bg-trexx-volt text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
            : 'border-border bg-transparent text-muted-foreground hover:border-white/40 hover:text-white'
        }`}
      >
        Todo el Catálogo
      </button>
      
      {categories.map((cat) => {
        const isActive = selected === cat.slug
        return (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.slug)}
            className={`px-6 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 border ${
              isActive
                ? 'border-trexx-volt bg-trexx-volt text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'border-border bg-transparent text-muted-foreground hover:border-white/40 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
