'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { Plus, Loader2, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function CategoryCreateDialog() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNameChange = (val: string) => {
    setName(val)
    // Auto-generate slug from name
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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({ name, slug, description }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || 'Error al crear la categoría')
      }

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
        className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold tracking-wider uppercase text-xs gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
      >
        <Plus size={16} />
        <span>Nueva Categoría</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#09090b] border border-white/10 rounded-sm w-full max-w-md p-6 space-y-6 animate-enter relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
                Nueva Categoría
              </h2>
              <p className="text-xs text-muted-foreground">
                Agrega un nuevo rubro al catálogo de productos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-white">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Accesorios"
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-trexx-volt"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-white">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="accesorios"
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-2.5 text-xs font-mono text-trexx-volt focus:outline-none focus:border-trexx-volt"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider uppercase text-white">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve detalle descriptivo de la categoría..."
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-trexx-volt resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-white/10 text-muted-foreground hover:text-white text-xs uppercase font-bold"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-trexx-volt text-black hover:bg-trexx-volt/90 text-xs uppercase font-bold gap-2"
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
