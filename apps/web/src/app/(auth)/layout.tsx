import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
        
        {/* Top Back Link */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-16 lg:left-24 animate-enter">
          <Link
            href="/"
            className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Content Wrapper */}
        <div className="w-full max-w-sm mx-auto">
          {children}
        </div>
      </div>

      {/* Right Column: Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black border-l border-white/5 overflow-hidden group">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-trexx-red/20 via-transparent to-trexx-volt/10 opacity-60 z-10 pointer-events-none mix-blend-screen transition-opacity duration-1000 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        
        {/* Brand Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-64 h-auto opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
            <Image 
              src="/trexx/logo.png" 
              alt="Trexx" 
              width={400} 
              height={100} 
              className="object-contain filter grayscale invert"
            />
          </div>
          <h2 className="mt-8 text-white/20 text-6xl font-black italic uppercase tracking-tighter mix-blend-overlay">
            DOMINA LA CANCHA
          </h2>
        </div>

        {/* Placeholder for the actual image. If the user drops an image in public/trexx/auth-bg.jpg, it will show up here. */}
        <img
          src="https://images.unsplash.com/photo-1622279457486-69d73ad3651c?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-50 grayscale transition-transform duration-[20s] ease-linear group-hover:scale-110"
        />
      </div>
    </div>
  )
}
