'use client'

import { useState } from 'react'

interface ProductImage {
  id: number
  url: string
  is_primary: boolean
}

interface ProductGalleryProps {
  images: ProductImage[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const primaryImage = images.find(img => img.is_primary)?.url || images[0]?.url || ''
  const [activeUrl, setActiveUrl] = useState(primaryImage)

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden w-full h-full flex items-center justify-center">
        <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-light">
          Sin imagen disponible
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden">
        <img
          src={activeUrl}
          alt={name}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setActiveUrl(img.url)}
              className={`w-20 h-24 border bg-[#F5F5F5] flex-shrink-0 transition-all duration-300 overflow-hidden ${
                activeUrl === img.url ? 'border-foreground scale-[1.02]' : 'border-transparent hover:border-foreground/50'
              }`}
            >
              <img
                src={img.url}
                alt={name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
