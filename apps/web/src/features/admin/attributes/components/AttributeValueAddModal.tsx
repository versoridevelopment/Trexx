'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { Plus, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface AttributeValueAddModalProps {
  attributeTypeId: number
  attributeTypeName: string
}

export function AttributeValueAddModal({ attributeTypeId, attributeTypeName }: AttributeValueAddModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value) {
      toast.error('Ingresa un valor válido')
      return
    }

    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/attribute-values`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          attribute_type_id: attributeTypeId,
          value,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || 'Error al agregar valor')
      }

      toast.success(`¡Valor "${value}" agregado a ${attributeTypeName}!`)
      setValue('')
      setIsOpen(false)
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Error al agregar el valor de atributo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        variant="ghost"
        className="text-[10px] font-bold text-trexx-volt uppercase tracking-wider hover:bg-trexx-volt/10 gap-1 h-7 px-2"
      >
        <Plus size={12} />
        <span>Agregar Valor</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-white/10 rounded-sm w-full max-w-sm p-6 space-y-6 animate-enter relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">
                Agregar {attributeTypeName}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Ingresa una nueva opción para {attributeTypeName}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-white">
                  Valor *
                </label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={attributeTypeName === 'Peso' ? 'Ej: 380g' : attributeTypeName === 'Talle' ? 'Ej: 42' : 'Ej: Azul'}
                  className="w-full bg-black border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-trexx-volt"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="border-white/10 text-muted-foreground hover:text-white text-xs uppercase"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading}
                  className="bg-trexx-volt text-black hover:bg-trexx-volt/90 text-xs uppercase font-bold"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : 'Guardar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
