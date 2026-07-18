import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-border overflow-hidden relative flex flex-col items-center py-16 gap-8">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-trexx-red to-transparent opacity-50" />
      
      {/* Logo */}
      <Link href="/" className="hover:opacity-80 transition-opacity mb-4">
        <Image 
          src="/trexx/logo.png" 
          alt="Trexx Padel" 
          width={120} 
          height={40} 
          className="object-contain invert brightness-0"
        />
      </Link>

      {/* Links */}
      <div className="flex flex-col items-center gap-3">
        <nav className="flex flex-wrap justify-center gap-3 text-[13px] font-medium text-muted-foreground/80">
          <Link href="/shop" className="hover:text-white transition-colors">Catálogo</Link>
          <span>·</span>
          <Link href="/shop" className="hover:text-white transition-colors">Categorías</Link>
          <span>·</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contacto</Link>
        </nav>
        
        <nav className="flex flex-wrap justify-center gap-3 text-[13px] font-medium text-muted-foreground/80">
          <Link href="/shipping" className="hover:text-white transition-colors">Envíos</Link>
          <span>·</span>
          <Link href="/returns" className="hover:text-white transition-colors">Políticas y Devoluciones</Link>
        </nav>
      </div>

      {/* Copyright */}
      <a 
        href="https://www.versorisports.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group text-[12px] text-muted-foreground transition-colors mt-2"
      >
        <span>© 2026 </span>
        <span className="font-bold text-white group-hover:text-violet-500 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all">
          Versori
        </span>
      </a>
    </footer>
  )
}
