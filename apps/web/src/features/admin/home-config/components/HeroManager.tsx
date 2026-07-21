'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { settingsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2, ArrowUp, ArrowDown, Upload } from 'lucide-react'
import { toast } from 'sonner'

interface Slide {
  id: string
  url: string
  media_type: 'image' | 'video'
  accent_color?: string
  link?: string
}

interface HeroManagerProps {
  initialSlides: Slide[]
}

export function HeroManager({ initialSlides }: HeroManagerProps) {
  const router = useRouter()
  const [slides, setSlides] = useState<Slide[]>(initialSlides)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const processQueue = async (queue: File[]) => {
    if (queue.length === 0) {
      setUploading(false)
      return
    }

    const file = queue[0]
    const isVideo = file.type.startsWith('video/')
    
    await uploadFile(file, isVideo ? 'video' : 'image')
    processQueue(queue.slice(1))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    processQueue(files)
    
    if (e.target) e.target.value = ''
  }

  const uploadFile = async (fileToUpload: File, mediaType: 'image' | 'video') => {
    try {
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()
      
      if (!session) {
        toast.error('Sesión no encontrada')
        return
      }

      const url = await settingsService.uploadMedia(fileToUpload, session.access_token)
      
      const newSlide: Slide = {
        id: crypto.randomUUID(),
        url,
        media_type: mediaType,
        accent_color: '#e40000',
      }

      setSlides((prev) => [...prev, newSlide])
      toast.success('Archivo subido correctamente')
    } catch (err: any) {
      toast.error('Error al subir archivo')
      console.error(err)
    }
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides]
    if (direction === 'up' && index > 0) {
      ;[newSlides[index - 1], newSlides[index]] = [newSlides[index], newSlides[index - 1]]
    } else if (direction === 'down' && index < newSlides.length - 1) {
      ;[newSlides[index + 1], newSlides[index]] = [newSlides[index], newSlides[index + 1]]
    }
    setSlides(newSlides)
  }

  const removeSlide = (id: string) => {
    setSlides((prev) => prev.filter((s) => s.id !== id))
  }

  const updateSlideColor = (id: string, color: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, accent_color: color } : s))
    )
  }

  const updateSlideLink = (id: string, link: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, link } : s))
    )
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

      await settingsService.updateByKey('home_hero_slides', slides, session.access_token)
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
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Slides del Hero</h2>
        <div>
          <input
            type="file"
            id="hero-upload"
            className="hidden"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label htmlFor="hero-upload">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer font-bold uppercase text-xs tracking-wider"
              asChild
              disabled={uploading}
            >
              <span>
                {uploading ? (
                  <Loader2 size={16} className="animate-spin mr-2" />
                ) : (
                  <Upload size={16} className="mr-2" />
                )}
                {uploading ? 'Subiendo...' : 'Subir Archivos'}
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {slides.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
            No hay slides configurados.
          </p>
        ) : (
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
            >
              <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                {slide.media_type === 'video' ? (
                  <video src={slide.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={slide.url} alt="Slide preview" className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 truncate">{slide.url}</p>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex items-center gap-4">
                    <p className="text-xs font-bold uppercase text-gray-400">
                      {slide.media_type}
                    </p>
                    <div className="flex items-center gap-2">
                      <label htmlFor={`color-${slide.id}`} className="text-xs font-bold text-gray-500 cursor-pointer">
                        Color de Acento:
                      </label>
                      <input
                        id={`color-${slide.id}`}
                        type="color"
                        value={slide.accent_color || '#e40000'}
                        onChange={(e) => updateSlideColor(slide.id, e.target.value)}
                        className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full max-w-sm">
                    <label htmlFor={`link-${slide.id}`} className="text-xs font-bold text-gray-500">
                      Link (opcional):
                    </label>
                    <input
                      id={`link-${slide.id}`}
                      type="text"
                      placeholder="Ej: /shop?category=palas"
                      value={slide.link || ''}
                      onChange={(e) => updateSlideLink(slide.id, e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-trexx-red"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-500 hover:text-black"
                    onClick={() => moveSlide(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-500 hover:text-black"
                    onClick={() => moveSlide(index, 'down')}
                    disabled={index === slides.length - 1}
                  >
                    <ArrowDown size={16} />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-red-400 hover:text-trexx-red hover:bg-red-50"
                  onClick={() => removeSlide(slide.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={loading || uploading}
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

