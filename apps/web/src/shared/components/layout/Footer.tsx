import Link from 'next/link'
import Image from 'next/image'
import { Camera, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-border overflow-hidden relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-trexx-red to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 flex flex-col gap-12">
        {/* Utility Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 animate-enter">
          
          {/* Brand & Socials */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/trexx/logo.png" 
                alt="Trexx Padel" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </Link>
            <div className="space-y-2 text-[11px] font-medium text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="text-trexx-red font-bold">A.</span> San juan 1660, Mar del Plata, Buenos Aires
              </p>
              <p className="flex items-center gap-2">
                <span className="text-trexx-red font-bold">E.</span> staff.trexxpadel@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-trexx-red font-bold">T.</span> +54 9 341 227 2837
              </p>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/trexxpadel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-trexx-volt transition-colors hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]">
                <Camera size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Essential Links */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-4">
            <Link href="/shop" className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="text-trexx-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Catálogo
            </Link>
            <Link href="/contact" className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="text-trexx-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Contacto
            </Link>
            <Link href="/shipping" className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="text-trexx-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Envíos
            </Link>
            <Link href="/returns" className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="text-trexx-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Devoluciones
            </Link>
          </nav>
        </div>

        {/* Bottom Bar: Copyright & Versori Credit */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 animate-enter" style={{ animationDelay: '150ms' }}>
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
            © {new Date().getFullYear()} TREXX PADEL. Todos los derechos reservados.
          </p>
          
          <a 
            href="https://www.versorisports.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-white transition-colors"
          >
            <span>Desarrollado por</span>
            <span className="font-black text-white group-hover:text-violet-500 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all">
              VERSORI
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
