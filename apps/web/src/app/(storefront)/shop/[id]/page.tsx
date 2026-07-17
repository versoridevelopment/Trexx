import { productsService, reviewsService } from '@repo/api-client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/shared/lib/supabase/server'
import { ReviewList } from '@/features/reviews/components/ReviewList'
import { ReviewForm } from '@/features/reviews/components/ReviewForm'
import { StarRating } from '@/features/reviews/components/StarRating'
import { RecommendedCarousel } from '@/features/products/components/RecommendedCarousel'
import { ProductGallery } from '@/features/products/components/ProductGallery'
import { AddToCartButton } from '@/features/cart/components/AddToCartButton'
import { ArrowLeft } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Buscamos todo en paralelo
  const [productRes, userRes, reviewsRes] = await Promise.allSettled([
    productsService.getById(Number(id)),
    supabase.auth.getUser(),
    reviewsService.getByProduct(Number(id))
  ])

  if (productRes.status === 'rejected' || !productRes.value) {
    notFound()
  }

  const product = productRes.value
  const user = userRes.status === 'fulfilled' ? userRes.value.data.user : null
  const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value : []

  // Buscamos recomendaciones basadas en la categoría del producto
  let recommended: any[] = []
  if (product.categories?.slug) {
    try {
      const allInCategory = await productsService.getAll(product.categories.slug)
      recommended = allInCategory.filter(p => p.id !== product.id).slice(0, 8)
    } catch (e) {
      console.error('Error fetching recommendations:', e)
    }
  }

  const stockDisponible = product.product_variants?.filter(v => v.stock > 0) ?? []
  
  // Calcular promedio para el resumen superior
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0

  return (
    <div className="bg-[#050505] min-h-screen text-foreground pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 lg:pt-40 lg:pb-20">
        
        {/* Breadcrumb / Back */}
        <nav className="mb-12 animate-enter">
          <Link
            href="/shop"
            className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-trexx-volt hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-2" />
            <span>Volver al Catálogo</span>
          </Link>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Image Gallery (7/12) */}
          <div className="lg:col-span-7 animate-enter" style={{ animationDelay: '150ms' }}>
            <ProductGallery
              images={product.product_images}
              fallbackImage={product.image}
              name={product.name}
            />
          </div>

          {/* Right Column: Info & Actions (5/12) - Sticky */}
          <div className="lg:col-span-5 relative animate-enter" style={{ animationDelay: '300ms' }}>
            <div className="lg:sticky lg:top-32 space-y-10">
              
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-trexx-volt">
                    {product.categories?.name}
                  </p>
                  {reviews.length > 0 && (
                    <div className="flex items-center gap-2">
                      <StarRating rating={Math.round(averageRating)} size="sm" />
                      <span className="text-[10px] font-bold text-muted-foreground">({reviews.length})</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-[1]">
                  {product.name}
                </h1>
                
                <p className="text-3xl font-black text-white tabular-nums drop-shadow-md">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Description */}
              {product.description && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
                    Sobre el artículo
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Variants / Selection */}
              {stockDisponible.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
                    {product.categories?.slug === 'palas' ? 'Elegí el peso' : 'Elegí tu talle'}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {stockDisponible.map((variant, index) => {
                      const mainAttr = variant.variant_attributes?.[0]?.attribute_values
                      const label = mainAttr ? `${mainAttr.value}` : 'Único'
                      const isSelected = index === 0 // default select first one for visual flair
                      
                      return (
                        <button
                          key={variant.id}
                          className={`min-w-[70px] h-[44px] px-4 flex items-center justify-center text-[12px] font-black tracking-widest uppercase rounded-sm transition-all duration-300 ${
                            isSelected 
                              ? 'border-2 border-trexx-volt bg-trexx-volt/10 text-trexx-volt shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                              : 'border border-border bg-black text-muted-foreground hover:border-trexx-volt hover:text-white'
                          }`}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-8 space-y-4">
                <AddToCartButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    image: product.product_images?.find((img) => img.is_primary)?.url || product.product_images?.[0]?.url || (product as { image?: string | null }).image || null
                  }}
                  disabled={stockDisponible.length === 0 && product.categories?.slug !== 'accesorios'}
                />
                <p className="text-[10px] text-center text-muted-foreground font-bold tracking-[0.1em] uppercase">
                  Envíos a todo el país. Retiro en tienda disponible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 max-w-4xl border-t border-border pt-16 animate-enter" style={{ animationDelay: '450ms' }}>
          <div className="space-y-2 mb-12">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
              Lo que dicen en la cancha
            </h2>
            <p className="text-[11px] tracking-[0.2em] uppercase text-trexx-volt font-bold">
              Opiniones de la banda
            </p>
          </div>

          <div className="space-y-16">
            <ReviewList
              reviews={reviews}
              currentUserId={user?.id ?? null}
              productId={Number(id)}
            />

            <ReviewForm
              productId={Number(id)}
              userId={user?.id ?? null}
            />
          </div>
        </div>
        
        {/* Recommended Section */}
        {recommended.length > 0 && (
          <div className="mt-32 border-t border-border pt-16 animate-enter" style={{ animationDelay: '600ms' }}>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-8">
              Llevate también
            </h2>
            <RecommendedCarousel products={recommended} />
          </div>
        )}
      </div>
    </div>
  )
}
