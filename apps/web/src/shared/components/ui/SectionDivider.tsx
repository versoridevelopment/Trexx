import React from 'react'

interface SectionDividerProps {
  title: string
  subtitle?: string
}

export const SectionDivider = ({ title, subtitle }: SectionDividerProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 relative overflow-hidden">
      {/* Background massive watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[10vw] font-black text-white/[0.02] uppercase whitespace-nowrap">
          {title}
        </span>
      </div>
      
      {/* Foreground actual content */}
      <div className="relative z-10 flex flex-col items-center space-y-4 animate-enter">
        {subtitle && (
          <p className="text-trexx-volt text-[10px] tracking-[0.4em] uppercase font-bold">
            {subtitle}
          </p>
        )}
        <h2 className="text-4xl md:text-6xl font-extralight tracking-tight uppercase">
          {title}
        </h2>
        <div className="w-12 h-1 bg-trexx-red mt-6" />
      </div>
    </div>
  )
}
