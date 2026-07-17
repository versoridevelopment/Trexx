import { productsService, reviewsService } from '@repo/api-client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/shared/lib/supabase/server'
import { ReviewList } from '@/features/reviews/components/ReviewList'
import { ReviewForm } from '@/features/reviews/components/ReviewForm'
import { StarRating } from '@/features/reviews/components/StarRating'
import { RecommendedCarousel } from '@/features/products/components/RecommendedCarousel'
import { ProductGallery } from '@/features/products/components/ProductGallery'

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
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      {/* Breadcrumb / Back */}
      <nav className="mb-12">
        <Link
          href="/products"
          className="group flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Volver a la colección</span>
        </Link>
      </nav>

      {/* Product Main Section: Asymmetrical Grid (7:5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Image (7/12) */}
        <div className="lg:col-span-7 space-y-8">
          <ProductGallery
            images={product.product_images ?? []}
            name={product.name}
          />
          
          {/* Mobile Info (Visible only on small screens) */}
          <div className="lg:hidden space-y-6">
            {/* Contenido duplicado de la columna derecha pero simplificado */}
          </div>
        </div>

        {/* Right Column: Info & Actions (5/12) - Sticky */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32 space-y-10">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
                  {product.categories?.name}
                </p>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Separator orientation="vertical" className="h-3" />
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={Math.round(averageRating)} size="sm" />
                      <span className="text-[10px] text-muted-foreground">({reviews.length})</span>
                    </div>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl font-light tracking-tight text-foreground uppercase leading-[1.1]">
                {product.name}
              </h1>
              
              <p className="text-2xl font-light text-foreground/90 tabular-nums">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <Separator className="bg-border/50" />

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
                  Descripción
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            )}

            {/* Variants / Selection */}
            {stockDisponible.length > 0 && (
              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
                  Opciones disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {stockDisponible.map((variant) => {
                    // Buscamos el valor principal a mostrar (talle, volumen, etc)
                    const mainAttr = variant.variant_attributes?.[0]?.attribute_values
                    const label = mainAttr ? `${mainAttr.value}` : 'Único'
                    
                    return (
                      <button
                        key={variant.id}
                        className="min-w-[60px] h-[40px] border border-border px-3 flex items-center justify-center text-[10px] tracking-widest uppercase hover:border-foreground transition-colors"
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}


            {/* CTA */}
            <div className="pt-4 space-y-4">
              <Button
                className="w-full h-14 text-[10px] tracking-[0.2em] uppercase rounded-none bg-black text-white hover:bg-black/90 transition-all font-medium py-0"
                disabled
              >
                Próximamente — Agregar al carrito
              </Button>
              <p className="text-[9px] text-center text-muted-foreground tracking-[0.1em] italic">
                Envíos a todo el país. Retiro en tienda disponible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-32">
        <RecommendedCarousel products={recommended} />
      </div>

      {/* Reviews Section */}
      <div className="mt-32 max-w-3xl">
        <div className="space-y-2 mb-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
            Experiencias
          </p>
          <h2 className="text-3xl font-light tracking-tight uppercase">
            Reseñas del producto
          </h2>
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
    </div>
  )
}
