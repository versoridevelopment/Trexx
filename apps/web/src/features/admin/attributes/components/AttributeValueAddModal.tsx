'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { Plus, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { attributeValuesService } from '@repo/api-client'

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

      await attributeValuesService.create(
        {
          attribute_type_id: attributeTypeId,
          value,
        },
        session?.access_token
      )

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
        className="text-[10px] font-bold text-trexx-red uppercase tracking-wider hover:bg-red-50 gap-1 h-7 px-2"
      >
        <Plus size={12} />
        <span>Agregar Valor</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <h2 className="text-lg font-black uppercase text-gray-900 tracking-tight">
                Agregar {attributeTypeName}
              </h2>
              <p className="text-xs text-gray-500">
                Ingresa una nueva opción para {attributeTypeName}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-wider uppercase text-gray-500">
                  Valor *
                </label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={
                    attributeTypeName === 'Peso' ? 'Ej: 380g'
                    : attributeTypeName === 'Talle' ? 'Ej: 42'
                    : 'Ej: Azul'
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-200 text-gray-500 hover:text-gray-900 text-xs uppercase font-bold"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading}
                  className="bg-trexx-red text-white hover:bg-red-700 text-xs uppercase font-bold gap-1 shadow-sm"
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
