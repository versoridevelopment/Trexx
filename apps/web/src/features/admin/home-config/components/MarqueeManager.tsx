'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { settingsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export interface MarqueeConfig {
  text: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  speed: 'super-slow' | 'slower' | 'slow' | 'normal' | 'fast'
}

interface MarqueeManagerProps {
  initialConfig: MarqueeConfig | null
}

const DEFAULT_CONFIG: MarqueeConfig = {
  text: 'TREXX PADEL • POTENCIA • CONTROL • VELOCIDAD',
  size: 'md',
  speed: 'normal'
}

export function MarqueeManager({ initialConfig }: MarqueeManagerProps) {
  const router = useRouter()
  const [config, setConfig] = useState<MarqueeConfig>(initialConfig || DEFAULT_CONFIG)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()
      
      if (!session) {
        toast.error('Sesión no encontrada')
        return
      }

      await settingsService.updateByKey('home_marquee_config', config, session.access_token)
      toast.success('Cinta guardada correctamente')
      router.refresh()
    } catch (err: any) {
      toast.error('Error al guardar la configuración')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100 max-w-3xl mt-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Cinta Infinita (Marquee)</h2>
        <p className="text-xs text-gray-500 mt-1">Configura el texto animado que separa el banner principal de las ventajas.</p>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            Texto
          </label>
          <input
            type="text"
            value={config.text}
            onChange={(e) => setConfig({ ...config, text: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-trexx-red"
            placeholder="TREXX PADEL..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Tamaño
            </label>
            <select
              value={config.size}
              onChange={(e) => setConfig({ ...config, size: e.target.value as any })}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-trexx-red"
            >
              <option value="sm">Pequeño</option>
              <option value="md">Mediano (Normal)</option>
              <option value="lg">Grande</option>
              <option value="xl">Extra Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Velocidad
            </label>
            <select
              value={config.speed}
              onChange={(e) => setConfig({ ...config, speed: e.target.value as any })}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-trexx-red"
            >
              <option value="super-slow">Súper Lento</option>
              <option value="slower">Más Lento</option>
              <option value="slow">Lento</option>
              <option value="normal">Normal</option>
              <option value="fast">Rápido</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-trexx-red text-white hover:bg-red-700 font-bold uppercase tracking-wider text-xs px-8"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin mr-2" />
          ) : null}
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
