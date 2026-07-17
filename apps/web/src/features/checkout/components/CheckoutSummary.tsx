'use client'

import { useCart } from '@/features/cart/context/CartContext'
import { ShoppingBag } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function CheckoutSummary() {
  const { items, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground opacity-50 py-12">
        <ShoppingBag size={48} className="stroke-1" />
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase">
          Tu carrito está vacío
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-enter">
      <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
        RESUMEN DEL PEDIDO
      </h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            {/* Image */}
            <div className="w-16 h-20 bg-[#111] rounded overflow-hidden relative shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={16} className="text-muted-foreground/30" />
                </div>
              )}
              {/* Badge quantity */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-trexx-red text-[9px] text-white font-bold">
                {item.quantity}
              </span>
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-sm font-black italic uppercase text-white line-clamp-1">
                {item.name}
              </h4>
              {item.variantName && (
                <p className="text-[10px] text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
                  {item.variantName}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col justify-center items-end">
              <p className="text-sm font-black text-white tabular-nums">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground uppercase font-bold tracking-[0.1em]">
          <span>Subtotal</span>
          <span className="tabular-nums text-white">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground uppercase font-bold tracking-[0.1em]">
          <span>Envío</span>
          <span className="text-trexx-volt">Gratis</span>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="flex justify-between items-end">
        <span className="text-sm text-white uppercase font-black tracking-[0.2em]">Total</span>
        <span className="text-3xl font-black text-white tabular-nums">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
