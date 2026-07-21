'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Slide {
  id: string
  url: string
  media_type: 'image' | 'video'
  accent_color?: string
  link?: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!slides || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000) // Autoplay every 5 seconds

    return () => clearInterval(interval)
  }, [slides])

  if (!slides || slides.length === 0) {
    return (
      <div className="absolute inset-0 bg-neutral-900 z-0 flex items-center justify-center">
        {/* Placeholder if no slides are configured */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trexx-red/10 rounded-full blur-[100px] z-0 pointer-events-none" />
      </div>
    )
  }

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const activeColor = slides[current]?.accent_color || '#e40000'

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden bg-black group"
      style={{ '--accent': activeColor } as React.CSSProperties}
    >
      {/* Slider Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const SlideContent = (
            <>
              {slide.media_type === 'video' ? (
                <video
                  src={slide.url}
                  className="w-full h-full object-contain sm:object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={slide.url}
                  alt={`Hero Slide ${index + 1}`}
                  className="w-full h-full object-contain sm:object-cover"
                />
              )}
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10 pointer-events-none" />
              
              {/* Dynamic radial subtle glow in the background */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] z-20 pointer-events-none" 
                style={{ backgroundColor: slide.accent_color || '#e40000', opacity: 0.15 }}
              />
            </>
          )

          return (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              {slide.link ? (
                <Link href={slide.link} className="block w-full h-full cursor-pointer relative z-30">
                  {SlideContent}
                </Link>
              ) : (
                <div className="w-full h-full">
                  {SlideContent}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white/70 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
            style={{ color: 'white' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = activeColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white/70 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10"
            style={{ color: 'white' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = activeColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? 'w-8 h-1.5 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
