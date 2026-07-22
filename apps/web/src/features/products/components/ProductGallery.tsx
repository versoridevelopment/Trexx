'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductImage {
  id: number
  url: string
  is_primary: boolean
}

interface ProductGalleryProps {
  images?: ProductImage[]
  fallbackImage?: string | null
  name: string
}

export function ProductGallery({ images = [], fallbackImage, name }: ProductGalleryProps) {
  const galleryImages = images.length > 0
    ? images
    : fallbackImage
      ? [{ id: 0, url: fallbackImage, is_primary: true }]
      : []

  const initialUrl = galleryImages.find(img => img.is_primary)?.url || galleryImages[0]?.url || ''
  const [activeUrl, setActiveUrl] = useState(initialUrl)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentUrl = activeUrl || initialUrl
  const currentIndex = galleryImages.findIndex(img => img.url === currentUrl)

  const handlePrev = () => {
    if (galleryImages.length <= 1) return
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1
    setActiveUrl(galleryImages[prevIdx].url)
  }

  const handleNext = () => {
    if (galleryImages.length <= 1) return
    const nextIdx = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0
    setActiveUrl(galleryImages[nextIdx].url)
  }

  if (galleryImages.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#0c0c0c] flex items-center justify-center border border-white/10">
        <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-bold">
          Sin foto disponible
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 items-start w-full">
      {/* 1. Vertical Thumbnails List (Estilo Nike) */}
      {galleryImages.length > 1 && (
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] w-full sm:w-20 shrink-0 pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-white/20">
          {galleryImages.map((img) => {
            const isActive = currentUrl === img.url
            return (
              <button
                key={img.id || img.url}
                onClick={() => setActiveUrl(img.url)}
                onMouseEnter={() => setActiveUrl(img.url)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-white flex-shrink-0 transition-all duration-200 overflow-hidden border ${
                  isActive
                    ? 'border-trexx-volt ring-1 ring-trexx-volt/50 opacity-100 shadow-[0_0_12px_rgba(204,255,0,0.25)]'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <img
                  src={img.url}
                  alt={name}
                  className="w-full h-full object-contain p-1.5"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* 2. Main Active Image Display (White Background Container) */}
      <div className="relative flex-1 w-full max-h-[460px] aspect-[4/5] overflow-hidden group flex items-center justify-center bg-white rounded-xl">
        {/* Main Product Photo */}
        <img
          src={currentUrl}
          alt={name}
          className={`w-full h-full object-contain transition-transform duration-500 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Icon Badge */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all border border-white/10 opacity-0 group-hover:opacity-100"
          title="Ampliar imagen"
        >
          <ZoomIn size={15} />
        </button>

        {/* Navigation Controls (< >) */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all border border-white/10 hover:scale-105"
              title="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all border border-white/10 hover:scale-105"
              title="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
