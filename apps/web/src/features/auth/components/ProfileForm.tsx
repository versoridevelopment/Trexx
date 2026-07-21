'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usersService } from '@repo/api-client'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { components } from '@repo/api-client'

type User = components['schemas']['User']

interface ProfileFormProps {
  user: User
  accessToken: string
}

export function ProfileForm({ user, accessToken }: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await usersService.updateMe(accessToken, {
        name: formData.name || null,
        phone: formData.phone || null
      })
      
      toast.success('Perfil actualizado correctamente')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al actualizar tu perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Correo Electrónico (Solo Lectura)
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/50 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Juan Pérez"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-trexx-volt transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+54 9 11 1234-5678"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-trexx-volt transition-colors"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-trexx-volt text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Guardar Cambios
        </button>
      </div>
    </form>
  )
}
