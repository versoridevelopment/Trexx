import Link from 'next/link'
import type { Product } from '../types/product.types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const coverImage = product.product_images?.find(img => img.is_primary)?.url
    || product.product_images?.[0]?.url
    || null

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="space-y-4">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-light">
                Sin imagen
              </span>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Action (Visual only) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-[9px] tracking-[0.2em] uppercase bg-white text-black px-6 py-2.5 shadow-sm whitespace-nowrap">
              Ver detalle
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-center">
          <p className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase font-light">
            {product.categories?.name ?? 'Colección'}
          </p>
          <h3 className="text-[11px] tracking-wide text-foreground font-light uppercase group-hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
          <p className="text-xs text-foreground/80 font-light italic">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
