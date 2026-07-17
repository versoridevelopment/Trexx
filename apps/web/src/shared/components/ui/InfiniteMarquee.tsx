import React from 'react'

interface InfiniteMarqueeProps {
  text: string
}

export const InfiniteMarquee = ({ text }: InfiniteMarqueeProps) => {
  // We duplicate the text multiple times to ensure seamless infinite scrolling
  const repeatedText = Array(10).fill(text).join(' • ')

  return (
    <div className="w-full overflow-hidden bg-trexx-red text-black py-4 flex whitespace-nowrap">
      <div className="flex animate-marquee w-max">
        {/* We render the text twice inside the scrolling container to cover the viewport seamlessly */}
        <span className="text-2xl font-black italic tracking-widest uppercase px-4">
          {repeatedText}
        </span>
        <span className="text-2xl font-black italic tracking-widest uppercase px-4">
          {repeatedText}
        </span>
      </div>
    </div>
  )
}
