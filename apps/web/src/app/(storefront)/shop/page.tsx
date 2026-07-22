import { productsService, categoriesService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { CategoryFilter } from '@/features/products/components/CategoryFilter'
import Link from 'next/link'

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams

  const [products, categories] = await Promise.all([
    productsService.getAll(category),
    categoriesService.getAll(),
  ])

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* Columna Izquierda: Sidebar de Filtros (Ancho Fijo) */}
          <div className="w-full md:w-56 shrink-0 md:sticky md:top-24">
            <CategoryFilter categories={categories} selected={category} />
          </div>

          {/* Columna Derecha: Grilla de Productos Ocupando Todo el Espacio */}
          <main className="flex-1 w-full min-w-0">
            <div key={category || 'all'} className="animate-enter">
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="w-16 h-1 bg-trexx-red mb-4" />
                  <h2 className="text-3xl font-black uppercase italic text-white">No encontramos artículos para esta selección.</h2>
                  <Link href="/shop" className="mt-8 text-[11px] font-black tracking-[0.3em] uppercase bg-trexx-volt text-black px-8 py-3 rounded-full hover:bg-white transition-colors">
                    Ver todos los artículos
                  </Link>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}
