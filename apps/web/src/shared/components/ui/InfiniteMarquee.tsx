import React from 'react'

interface InfiniteMarqueeProps {
  text?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  speed?: 'super-slow' | 'slower' | 'slow' | 'normal' | 'fast'
}

export const InfiniteMarquee = ({ 
  text = 'TREXX PADEL • POTENCIA • CONTROL • VELOCIDAD',
  size = 'md',
  speed = 'normal'
}: InfiniteMarqueeProps) => {
  // We duplicate the text multiple times to ensure seamless infinite scrolling
  const repeatedText = Array(10).fill(text).join(' • ')

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  }

  const speedValues = {
    'super-slow': '120s',
    slower: '80s',
    slow: '50s',
    normal: '25s',
    fast: '10s',
  }

  return (
    <div className="w-full overflow-hidden bg-trexx-red text-black py-4 flex whitespace-nowrap">
      <div 
        className="flex animate-marquee w-max"
        style={{ animationDuration: speedValues[speed] }}
      >
        {/* We render the text twice inside the scrolling container to cover the viewport seamlessly */}
        <span className={`${sizeClasses[size]} font-black italic tracking-widest uppercase px-4`}>
          {repeatedText}
        </span>
        <span className={`${sizeClasses[size]} font-black italic tracking-widest uppercase px-4`}>
          {repeatedText}
        </span>
      </div>
    </div>
  )
}
