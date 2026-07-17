'use client'

import { useState } from 'react'

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
  // Build effective images list
  const galleryImages = images.length > 0
    ? images
    : fallbackImage
      ? [{ id: 0, url: fallbackImage, is_primary: true }]
      : []

  const initialUrl = galleryImages.find(img => img.is_primary)?.url || galleryImages[0]?.url || ''
  const [activeUrl, setActiveUrl] = useState(initialUrl)

  // Update active image if galleryImages changes or initialUrl changes
  const currentUrl = activeUrl || initialUrl

  if (galleryImages.length === 0) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#111] flex items-center justify-center border border-border">
        <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-bold">
          Sin foto disponible
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Image View */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm group flex items-center justify-center bg-[#0d0d0d] border border-white/5">
        {/* Neon Glow behind the active image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-trexx-volt/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover:opacity-60" />
        
        <img
          src={currentUrl}
          alt={name}
          className="relative z-10 w-full h-full object-contain p-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails list */}
      {galleryImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {galleryImages.map((img) => {
            const isActive = currentUrl === img.url
            return (
              <button
                key={img.id || img.url}
                onClick={() => setActiveUrl(img.url)}
                className={`relative w-20 h-24 rounded-sm bg-[#111] flex-shrink-0 transition-all duration-300 overflow-hidden border ${
                  isActive
                    ? 'border-trexx-volt shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-[1.02]'
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={name}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
