'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AddToCartButton } from '@/features/cart/components/AddToCartButton'

interface AttributeType {
  id: number
  name: string
  slug: string
}

interface AttributeValue {
  id: number
  value: string
  attribute_types: AttributeType
}

interface VariantAttribute {
  attribute_values: AttributeValue
}

interface ColorVariation {
  id: number
  name: string
  slug: string | null
  image: string | null
  color: {
    id: number
    name: string
    hex_code: string | null
  } | null
}

interface ProductInteractiveSectionProps {
  product: {
    id: number
    name: string
    price: number
    image: string | null
    categories?: {
      slug: string
    } | null
  }
  variants: any[]
  colorVariations?: ColorVariation[]
}

export function ProductInteractiveSection({
  product,
  variants,
  colorVariations = [],
}: ProductInteractiveSectionProps) {
  // 1. Obtener todos los tipos de atributos disponibles y sus valores únicos
  const attributeGroups: Record<
    string,
    { type: AttributeType; values: Map<number, string> }
  > = {}

  // Filtrar solo variantes activas (con stock o no, pero las mostramos todas para saber disponibilidad)
  variants.forEach((v: any) => {
    v.variant_attributes.forEach((va: any) => {
      const type = va.attribute_values.attribute_types
      const val = va.attribute_values

      if (!attributeGroups[type.slug]) {
        attributeGroups[type.slug] = {
          type,
          values: new Map(),
        }
      }
      attributeGroups[type.slug].values.set(val.id, val.value)
    })
  })

  const groups = Object.values(attributeGroups).map((g: any) => ({
    type: g.type,
    values: Array.from(g.values.entries()).map((entry: any) => ({ id: entry[0], value: entry[1] })),
  }))

  // 2. Estado de selecciones del cliente
  const [selections, setSelections] = useState<Record<string, number>>({})

  // Autoseleccionar la primera opción disponible de cada grupo al montar
  useEffect(() => {
    if (groups.length === 0) return

    const initialSelections: Record<string, number> = {}
    groups.forEach((g: any) => {
      if (g.values.length > 0) {
        initialSelections[g.type.slug] = g.values[0].id
      }
    })
    setSelections(initialSelections)
  }, [variants])

  // 3. Buscar variante coincidente
  const matchedVariant = variants.find((v: any) => {
    // Si la variante no tiene atributos y el producto tampoco, es la variante por defecto
    if (v.variant_attributes.length === 0 && groups.length === 0) return true

    if (v.variant_attributes.length === 0) return false
    // Debe coincidir con todas las selecciones actuales
    return v.variant_attributes.every((va: any) => {
      const typeSlug = va.attribute_values.attribute_types.slug
      const valId = va.attribute_values.id
      return selections[typeSlug] === valId
    })
  })

  // Calcular precio final
  const priceModifier = matchedVariant ? Number(matchedVariant.price_modifier || 0) : 0
  const finalPrice = product.price + priceModifier
  const hasStock = matchedVariant ? matchedVariant.stock > 0 : false

  const handleSelect = (typeSlug: string, valueId: number) => {
    setSelections((prev) => ({
      ...prev,
      [typeSlug]: valueId,
    }))
  }

  // Generar nombre de la variante para el carrito (ej: "Negro / 365g")
  const getVariantLabel = () => {
    if (!matchedVariant) return ''
    return matchedVariant.variant_attributes
      .map((va: any) => va.attribute_values.value)
      .join(' / ')
  }

  return (
    <div className="space-y-8">
      {/* Mostrar Precio Dinámico */}
      <div className="space-y-1">
        <p className="text-3xl font-black text-white tabular-nums drop-shadow-md">
          ${finalPrice.toFixed(2)}
        </p>
        {priceModifier !== 0 && (
          <p className="text-xs text-trexx-volt font-bold uppercase tracking-wider">
            {priceModifier > 0 ? `+$${priceModifier.toFixed(2)}` : `-$${Math.abs(priceModifier).toFixed(2)}`} por variante
          </p>
        )}
      </div>

      {/* Selector de Colores con Miniatura de Portada */}
      {colorVariations.length > 1 && (
        <div className="space-y-3 pt-4 border-t border-white/5">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
            Elegí el color
          </p>
          <div className="flex flex-wrap gap-3">
            {colorVariations.map((variant) => {
              const isSelected = variant.id === product.id
              const imageUrl = variant.image

              return (
                <Link
                  key={variant.id}
                  href={`/shop/${variant.slug || variant.id}`}
                  className={`relative flex items-center justify-center rounded-md transition-all duration-300 ${isSelected
                    ? 'ring-2 ring-trexx-volt ring-offset-2 ring-offset-black scale-105 shadow-[0_0_12px_rgba(204,255,0,0.5)]'
                    : 'hover:scale-105 border border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  title={variant.color?.name || variant.name}
                >
                  <div className="w-12 h-12 rounded-md border border-white/20 overflow-hidden bg-zinc-900 flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={variant.color?.name || variant.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-white uppercase font-mono">
                        {variant.color?.name?.substring(0, 3) || 'VAR'}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Selectores de Atributos */}
      {groups.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-white/5">
          {groups.map((group: any) => {
            const selectedValueId = selections[group.type.slug]

            return (
              <div key={group.type.id} className="space-y-3">
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">
                  Elegí el {group.type.name.toLowerCase()}
                </p>
                <div className="flex flex-wrap gap-3">
                  {group.values.map((val: any) => {
                    const isSelected = selectedValueId === val.id

                    return (
                      <button
                        key={val.id}
                        type="button"
                        onClick={() => handleSelect(group.type.slug, val.id)}
                        className={`min-w-[70px] h-[44px] px-4 flex items-center justify-center text-[12px] font-black tracking-widest uppercase rounded-sm transition-all duration-300 ${isSelected
                          ? 'border-2 border-trexx-volt bg-trexx-volt/10 text-trexx-volt shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                          : 'border border-border bg-black text-muted-foreground hover:border-trexx-volt hover:text-white'
                          }`}
                      >
                        {val.value}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Estado de Stock de la variante seleccionada */}
      {variants.length > 0 && (
        <div className="text-xs font-bold uppercase tracking-wider">
          {matchedVariant ? (
            hasStock ? (
              <span className="text-trexx-volt">En stock ({matchedVariant.stock} disponibles)</span>
            ) : (
              <span className="text-red-500">Sin stock</span>
            )
          ) : (
            <span className="text-amber-500">Combinación no disponible</span>
          )}
        </div>
      )}

      {/* CTA de Compra */}
      <div className="pt-4 space-y-4">
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: finalPrice,
            image: product.image,
          }}
          selectedVariant={
            matchedVariant
              ? {
                id: matchedVariant.id,
                name: getVariantLabel(),
              }
              : undefined
          }
          disabled={
            variants.length > 0 && (!matchedVariant || !hasStock)
          }
        />
        <p className="text-[10px] text-center text-muted-foreground font-bold tracking-[0.1em] uppercase">
          Envíos a todo el país. Retiro en tienda disponible.
        </p>
      </div>
    </div>
  )
}
