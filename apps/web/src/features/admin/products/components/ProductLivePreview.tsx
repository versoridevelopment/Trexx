'use client'

import { ProductGallery } from '@/features/products/components/ProductGallery'
import { ProductInteractiveSection } from '@/features/products/components/ProductInteractiveSection'
import { ProductDescription } from '@/features/products/components/ProductDescription'
import { StarRating } from '@/features/reviews/components/StarRating'
import { Separator } from '@/components/ui/separator'
import { type GeneratedVariantEntry } from './ProductVariantSelector'

interface ProductLivePreviewProps {
  name: string
  price: string
  description: string
  categoryId: string
  categories: any[]
  previews: string[] // local object URLs for images
  generatedVariants: GeneratedVariantEntry[]
  variantMode: 'simple' | 'variable'
}

export function ProductLivePreview({
  name,
  price,
  description,
  categoryId,
  categories,
  previews,
  generatedVariants,
  variantMode,
}: ProductLivePreviewProps) {
  // Encontrar categoría
  const category = categories.find((c) => c.id.toString() === categoryId)

  // Mapear imágenes a formato de ProductGallery
  const galleryImages = previews.map((url, idx) => ({
    id: idx,
    url,
    is_primary: idx === 0,
  }))

  // Formato mock para ProductInteractiveSection
  const mockProduct = {
    id: 0,
    name: name || 'Nombre del Producto',
    price: Number(price) || 0,
    image: previews.length > 0 ? previews[0] : null,
    categories: category || null,
  }

  // Mapear variantes del admin al formato de la web pública
  const parsedVariants = variantMode === 'simple'
    ? [] // ProductInteractiveSection sabe manejar variants=[] como simple
    : generatedVariants.map((gv) => ({
      id: gv.key,
      stock: gv.stock,
      price_modifier: gv.priceModifier,
      variant_attributes: gv.attributeValues.map((av) => ({
        attribute_values: {
          id: av.id,
          value: av.value,
          attribute_types: {
            id: av.typeId,
            name: av.typeName,
            slug: av.typeSlug,
          },
        },
      })),
    }))

  return (
    <div className="bg-[#050505] text-foreground w-full h-full min-h-[600px] flex flex-col p-4 sm:p-6 lg:p-8 animate-enter">
      <div className="flex items-center gap-2 mb-6">

      </div>

      <div className="grid grid-cols-1 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="w-full">
          <ProductGallery
            images={galleryImages}
            fallbackImage={null}
            name={name || 'Producto Nuevo'}
          />
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-trexx-volt">
                {category?.name || 'Categoría'}
              </p>
              <div className="flex items-center gap-2">
                <StarRating rating={5} size="sm" />
                <span className="text-[10px] font-bold text-muted-foreground">
                  (0)
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-[1]">
              {name || 'TITULO DEL PRODUCTO'}
            </h1>
          </div>

          <Separator className="bg-white/10" />

          {/* Description */}
          {description && (
            <div className="space-y-3">
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
                Sobre el artículo
              </p>
              <ProductDescription description={description} />
            </div>
          )}

          <ProductInteractiveSection
            product={mockProduct}
            variants={parsedVariants}
            colorVariations={[]} // Ocultar miniaturas de color en la preview
          />
        </div>
      </div>
    </div>
  )
}
