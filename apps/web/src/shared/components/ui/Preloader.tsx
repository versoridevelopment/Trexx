'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export const Preloader = () => {
  // isMounted controls if the component is in the DOM
  const [isMounted, setIsMounted] = useState(true)
  // isFadingOut triggers the exit animation
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // We simulate a 2-second loading time for the initial resources
    // (In the future, this can listen to a global state or Next.js router events)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2000)

    // Remove from DOM entirely 500ms after the fade-out starts
    // (Matches the 0.5s duration of --animate-fade-out)
    const unmountTimer = setTimeout(() => {
      setIsMounted(false)
    }, 2500)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] 
        ${isFadingOut ? 'animate-fade-out' : ''}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glow behind the logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-trexx-red rounded-full blur-[40px] opacity-70 animate-pulse-glow" />
        
        {/* Logo */}
        <div className="relative z-10 animate-enter">
          <Image
            src="/trexx/logo.png"
            alt="Trexx Padel Store"
            width={180}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        {/* Loading Dots */}
        <div className="relative z-10 flex gap-2 mt-8">
          <div className="w-3 h-3 bg-trexx-red rounded-full animate-bounce-dot" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-trexx-red rounded-full animate-bounce-dot" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-trexx-red rounded-full animate-bounce-dot" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
