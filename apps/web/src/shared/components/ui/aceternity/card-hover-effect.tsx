'use client'

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-trexx-volt/10 block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col items-center text-center space-y-6 bg-black border border-white/[0.08] group-hover:border-trexx-volt/50 transition-colors duration-300 rounded-xl overflow-hidden">
            <div className="p-4 bg-white/[0.03] rounded-full group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">
              {item.title}
            </h3>
            <p className="text-[12px] text-muted-foreground font-light leading-relaxed px-4">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
