'use client'

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const DirectionAwareHover = ({
  imageUrl,
  mediaType = 'image',
  children,
  className,
  imageClassName,
}: {
  imageUrl?: string
  mediaType?: 'image' | 'video'
  children: React.ReactNode
  className?: string
  imageClassName?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left")

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return

    const direction = getDirection(event, ref.current)
    switch (direction) {
      case 0:
        setDirection("top")
        break
      case 1:
        setDirection("right")
        break
      case 2:
        setDirection("bottom")
        break
      case 3:
        setDirection("left")
        break
      default:
        setDirection("left")
        break
    }
  }

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect()
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1)
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1)
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
    return d
  }

  const variants = {
    initial: { x: 0 },
    exit: { x: 0, y: 0 },
    top: { y: 20 },
    bottom: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  const textVariants = {
    initial: { y: 0, x: 0, opacity: 0 },
    exit: { y: 0, x: 0, opacity: 0 },
    top: { y: -20, opacity: 1 },
    bottom: { y: 20, opacity: 1 },
    left: { x: -20, opacity: 1 },
    right: { x: 20, opacity: 1 },
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "group/card relative overflow-hidden rounded-sm bg-transparent w-full h-full",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full bg-neutral-900"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          {imageUrl && mediaType === 'image' && (
            <motion.img
              variants={variants}
              className={cn(
                "absolute inset-0 h-full w-full object-cover scale-105 opacity-50 group-hover/card:opacity-30 transition-opacity duration-500",
                imageClassName
              )}
              alt="Category Image"
              src={imageUrl}
            />
          )}
          {imageUrl && mediaType === 'video' && (
            <motion.video
              variants={variants}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center scale-105 opacity-50 group-hover/card:opacity-30 transition-opacity duration-500",
                imageClassName
              )}
              src={imageUrl}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          {!imageUrl && (
            <motion.div
              variants={variants}
              className={cn(
                "h-full w-full bg-neutral-900 scale-105 opacity-50 group-hover/card:opacity-30 transition-opacity duration-500",
                imageClassName
              )}
            />
          )}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 p-8 flex flex-col justify-end z-10"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
