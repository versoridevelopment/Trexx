import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import type { Product } from '../types/product.types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="space-y-4">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-trexx-volt/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 drop-shadow-xl relative z-10"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-bold">
                Sin foto
              </span>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
          
          {/* Quick Action */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-trexx-volt text-black px-6 py-2 rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.4)] whitespace-nowrap">
              Ver detalle
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 text-left px-1">
          <p className="text-[10px] text-trexx-volt tracking-[0.2em] uppercase font-bold">
            {product.categories?.name ?? 'Colección'}
          </p>
          <h3 className="text-xl tracking-tighter text-white font-black italic uppercase group-hover:text-trexx-volt transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground font-black tabular-nums">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
