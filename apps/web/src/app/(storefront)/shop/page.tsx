import { productsService, categoriesService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { CategoryFilter } from '@/features/products/components/CategoryFilter'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams

  const [products, categories] = await Promise.all([
    productsService.getAll(category),
    categoriesService.getAll(),
  ])

  const currentCategoryName = category 
    ? categories.find(c => c.slug === category)?.name 
    : 'Todo el Catálogo'

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Catalog Header */}
      <header className="border-b border-border/40 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-trexx-red/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10 animate-enter">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
              ARMÁ TU EQUIPO
            </h1>
            <p className="text-[12px] tracking-[0.3em] uppercase text-trexx-volt font-bold">
              {currentCategoryName}
            </p>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 w-full bg-background/80 backdrop-blur-xl border-b border-border/40 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <CategoryFilter categories={categories} selected={category} />
          
          <div className="flex items-center gap-4 w-full md:w-auto animate-enter" style={{ animationDelay: '150ms' }}>
            {/* Pseudo Search Input (Visual UX) */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="BUSCAR ARTÍCULO..." 
                className="w-full bg-[#0a0a0a] border border-border rounded-full py-2 pl-10 pr-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white focus:outline-none focus:border-trexx-volt transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Full Width Grid */}
      <main className="max-w-7xl mx-auto px-6 pt-16">
        <div key={category || 'all'} className="animate-enter" style={{ animationDelay: '300ms' }}>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-1 bg-trexx-red mb-4" />
              <h2 className="text-3xl font-black uppercase italic">¡Uf! Está vacío por acá</h2>
              <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase">No encontramos artículos para esta selección.</p>
              <Link href="/shop" className="mt-8 text-[11px] font-black tracking-[0.3em] uppercase bg-white text-black px-8 py-3 hover:bg-trexx-volt transition-colors">
                Ver todos los artículos
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
