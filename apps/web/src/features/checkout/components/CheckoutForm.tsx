'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/features/cart/context/CartContext'
import { ordersService } from '@repo/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, CreditCard, CheckCircle2, Loader2 } from 'lucide-react'

export function CheckoutForm({ accessToken }: { accessToken?: string }) {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados del formulario manual (sin hook-form por simplicidad para simulado)
  const [formData, setFormData] = useState({
    recipientName: '',
    addressId: 1, // Simulado
    paymentMethodId: 1, // Simulado
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken) return setError('No estás autenticado.')
    if (items.length === 0) return setError('El carrito está vacío.')

    try {
      setLoading(true)
      setError(null)
      
      const payload = {
        items: items.map(i => ({
          productId: i.id,
          variantId: i.variantId || undefined,
          quantity: i.quantity,
          price: i.price
        })),
        addressId: formData.addressId,
        paymentMethodId: formData.paymentMethodId,
        recipientName: formData.recipientName,
        notes: formData.notes
      }

      await ordersService.checkout(payload, accessToken)
      
      // Limpiar carrito y redirigir
      clearCart()
      router.push('/checkout/success')
      
    } catch (err: any) {
      setError(err.message || 'Error procesando la orden.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="p-4 bg-trexx-red/10 border border-trexx-red text-trexx-red text-sm font-bold">
        Tu carrito está vacío. Agrega productos para poder comprar.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-enter">
      
      {/* Información de Envío */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <MapPin className="text-trexx-volt" />
          <h2 className="text-lg font-black uppercase tracking-widest">
            Datos de Entrega
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              Nombre de quien recibe
            </Label>
            <Input 
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="bg-[#111] border-border h-12" 
              placeholder="Juan Pérez"
            />
          </div>

          <div className="p-4 border border-white/10 rounded-sm bg-[#111]/50 flex items-start gap-4">
            <div className="mt-1">
              <CheckCircle2 size={18} className="text-trexx-volt" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Dirección Principal</p>
              <p className="text-xs text-muted-foreground mt-1">San Juan 1660, Mar del Plata</p>
              <p className="text-[10px] text-trexx-volt uppercase tracking-widest font-bold mt-2">
                Usando dirección guardada (Simulado)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              Notas adicionales (opcional)
            </Label>
            <Input 
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="bg-[#111] border-border h-12" 
              placeholder="Dejar en portería..."
            />
          </div>
        </div>
      </div>

      {/* Pago Simulado */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <CreditCard className="text-trexx-volt" />
          <h2 className="text-lg font-black uppercase tracking-widest">
            Pago
          </h2>
        </div>

        <div className="p-6 border border-trexx-volt/30 bg-trexx-volt/5 rounded-sm flex items-center justify-between cursor-pointer hover:border-trexx-volt transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full border-4 border-trexx-volt bg-black" />
            <span className="font-bold uppercase tracking-widest text-sm">Tarjeta de Crédito / Débito (Simulado)</span>
          </div>
          <CreditCard size={20} className="text-trexx-volt" />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-trexx-red/10 border border-trexx-red text-trexx-red text-sm font-bold text-center">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full h-16 bg-trexx-volt text-black hover:bg-white text-sm font-black italic tracking-[0.2em] uppercase rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'PAGAR AHORA'}
      </Button>

    </form>
  )
}
