'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { settingsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, Upload, Trash2, Image as ImageIcon, Video } from 'lucide-react'
import { toast } from 'sonner'

export type EquipmentCategory = 'palas' | 'zapatillas' | 'indumentaria' | 'accesorios'

export interface EquipmentMedia {
  url: string
  media_type: 'image' | 'video'
}

export type EquipmentConfig = Record<EquipmentCategory, EquipmentMedia | null>

const DEFAULT_CONFIG: EquipmentConfig = {
  palas: null,
  zapatillas: null,
  indumentaria: null,
  accesorios: null,
}

interface EquipmentManagerProps {
  initialConfig: EquipmentConfig | null
}

const CATEGORIES: { id: EquipmentCategory; label: string }[] = [
  { id: 'palas', label: 'Palas' },
  { id: 'zapatillas', label: 'Zapatillas' },
  { id: 'indumentaria', label: 'Indumentaria' },
  { id: 'accesorios', label: 'Accesorios' },
]

export function EquipmentManager({ initialConfig }: EquipmentManagerProps) {
  const router = useRouter()
  const [config, setConfig] = useState<EquipmentConfig>(initialConfig || DEFAULT_CONFIG)
  const [loading, setLoading] = useState(false)
  const [uploadingCategory, setUploadingCategory] = useState<EquipmentCategory | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: EquipmentCategory) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingCategory(category)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()
      
      if (!session) {
        toast.error('Sesión no encontrada')
        return
      }

      const isVideo = file.type.startsWith('video/')
      const url = await settingsService.uploadMedia(file, session.access_token, 'home/equipment')
      
      setConfig(prev => ({
        ...prev,
        [category]: { url, media_type: isVideo ? 'video' : 'image' }
      }))
      
      toast.success('Medio subido correctamente')
    } catch (err: any) {
      toast.error('Error al subir el archivo')
      console.error(err)
    } finally {
      setUploadingCategory(null)
      if (e.target) e.target.value = ''
    }
  }

  const handleRemoveMedia = (category: EquipmentCategory) => {
    setConfig(prev => ({
      ...prev,
      [category]: null
    }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()
      
      if (!session) {
        toast.error('Sesión no encontrada')
        return
      }

      await settingsService.updateByKey('home_equipment_config', config, session.access_token)
      toast.success('Configuración guardada correctamente')
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
        <h2 className="text-lg font-bold">Imágenes de Equipamiento</h2>
        <p className="text-xs text-gray-500 mt-1">
          Configura las imágenes o videos de fondo para las 4 categorías principales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {CATEGORIES.map((cat) => {
          const media = config[cat.id]
          const isUploading = uploadingCategory === cat.id

          return (
            <div key={cat.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase">{cat.label}</h3>
                {media && (
                  <button 
                    onClick={() => handleRemoveMedia(cat.id)}
                    className="text-gray-400 hover:text-trexx-red transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden relative flex items-center justify-center border border-dashed border-gray-300">
                {media ? (
                  <>
                    {media.media_type === 'video' ? (
                      <video src={media.url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={media.url} alt={cat.label} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-trexx-volt transition-colors">
                          Cambiar
                          <input 
                            type="file" 
                            accept="image/*,video/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, cat.id)}
                            disabled={isUploading}
                          />
                       </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-trexx-red hover:bg-gray-100 transition-colors">
                    {isUploading ? (
                      <Loader2 size={24} className="animate-spin mb-2" />
                    ) : (
                      <Upload size={24} className="mb-2" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {isUploading ? 'Subiendo...' : 'Subir Archivo'}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*,video/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, cat.id)}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={loading || uploadingCategory !== null}
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
