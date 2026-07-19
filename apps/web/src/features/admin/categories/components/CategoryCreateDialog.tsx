'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { Plus, Loader2, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { categoriesService } from '@repo/api-client'

const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 transition-all"
const labelClass = "text-[11px] font-bold tracking-wider uppercase text-gray-500"

export function CategoryCreateDialog() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNameChange = (val: string) => {
    setName(val)
    setSlug(val.toLowerCase().trim().replace(/[\s\W]+/g, '-'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) {
      toast.error('Nombre y slug son obligatorios')
      return
    }

    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()

      await categoriesService.create(
        { name, slug, description },
        session?.access_token
      )

      toast.success('¡Categoría creada exitosamente!')
      setName('')
      setSlug('')
      setDescription('')
      setIsOpen(false)
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Error al crear la categoría')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-trexx-red text-white hover:bg-red-700 font-bold tracking-wider uppercase text-xs gap-2 shadow-sm"
      >
        <Plus size={15} />
        <span>Nueva Categoría</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">
                Nueva Categoría
              </h2>
              <p className="text-xs text-gray-500">
                Agrega un nuevo rubro al catálogo de productos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className={labelClass}>Nombre *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Accesorios"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Slug (URL) *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="accesorios"
                  className={`${inputClass} font-mono text-trexx-red`}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Descripción</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve detalle descriptivo de la categoría..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-200 text-gray-500 hover:text-gray-900 text-xs uppercase font-bold"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-trexx-red text-white hover:bg-red-700 text-xs uppercase font-bold gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Crear Categoría</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
