'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '../context/CartContext'

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    price: number
    image?: string | null
  }
  selectedVariant?: {
    id: number
    name: string
  }
  disabled?: boolean
}

export function AddToCartButton({ product, selectedVariant, disabled }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    
    // El id en el cart puede ser una combinación de producto + variante para separarlos
    const cartItemId = selectedVariant 
      ? `${product.id}-${selectedVariant.id}`
      : `${product.id}`

    addItem({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image ?? undefined,
      quantity: 1,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled || isAdding}
      className="w-full h-16 text-[14px] font-black italic tracking-[0.2em] uppercase rounded-sm bg-trexx-volt text-black hover:bg-trexx-red hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300 py-0 disabled:opacity-50"
    >
      {isAdding ? 'AÑADIENDO...' : 'AÑADIR AL CARRITO'}
    </Button>
  )
}
