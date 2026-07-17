'use client'

import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart()

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-[#050505] border-l border-border p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border bg-black shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <ShoppingBag size={20} className="text-trexx-volt" />
              TU EQUIPAMIENTO
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col relative overflow-x-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 p-4 mb-6 border border-border bg-black/50 rounded-sm group shrink-0 origin-center"
              >
                {/* Image */}
                <div className="w-20 h-24 bg-[#111] rounded overflow-hidden relative shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={20} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-black italic uppercase text-white truncate pr-4">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-trexx-red transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {item.variantName && (
                      <p className="text-[10px] text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground font-bold tabular-nums mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-sm bg-black">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-black text-white tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {items.length === 0 && (
              <motion.div 
                key="empty" 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="m-auto flex flex-col items-center justify-center space-y-6 text-muted-foreground opacity-50 py-12"
              >
                <ShoppingBag size={64} className="stroke-1" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase">
                  Tu carrito está vacío
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="shrink-0">
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div 
                key="footer-content" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 border-t border-border bg-black space-y-4"
              >
                <div className="flex items-center justify-between text-sm uppercase">
                  <span className="text-muted-foreground font-bold tracking-[0.1em]">Subtotal</span>
                  <span className="text-xl font-black text-white tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground tracking-[0.1em] uppercase">
                  Los costos de envío y descuentos se calculan en el checkout.
                </p>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full">
                  <Button className="w-full h-14 bg-trexx-volt text-black hover:bg-trexx-red hover:text-white text-[12px] font-black italic tracking-[0.2em] uppercase rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.15)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                    FINALIZAR COMPRA
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  )
}
