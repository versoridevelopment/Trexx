'use client'

import { ProductCard } from './ProductCard'
import type { Product } from '../types/product.types'

interface RecommendedCarouselProps {
  products: Product[]
}

export function RecommendedCarousel({ products }: RecommendedCarouselProps) {
  if (products.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="space-y-1">

      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {products.map((product) => (
            <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Estilo para ocultar scrollbar */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  )
}
