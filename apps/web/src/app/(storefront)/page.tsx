import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/shared/lib/supabase/server'
import { productsService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { ArrowRight, Zap, ShieldCheck, Trophy } from 'lucide-react'
import { InfiniteMarquee } from '@/shared/components/ui/InfiniteMarquee'
import { SectionDivider } from '@/shared/components/ui/SectionDivider'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const products = await productsService.getAll()
  // Grab a few featured products
  const featured = products.slice(0, 4)

  return (
    <div className="pb-20 bg-background text-foreground">
      {/* Hero Section (NewReleaseHero) */}
      <section className="relative h-[calc(100vh)] w-full flex items-center justify-center overflow-hidden bg-black border-b border-border">
        {/* Placeholder for actual hero video or image */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black z-0" />

        {/* Radial subtle glow in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trexx-red/10 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl">
          <div className="space-y-4">
            <p className="text-[12px] md:text-sm tracking-[0.6em] uppercase text-trexx-volt drop-shadow-sm animate-enter font-bold">
              Nueva Colección 2026
            </p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[0.85] animate-enter" style={{ animationDelay: '200ms' }}>
              DOMINA LA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-trexx-red to-red-500">CANCHA</span>
            </h1>
          </div>
          <p className="text-sm md:text-xl text-white/80 max-w-xl mx-auto font-light leading-relaxed drop-shadow-md animate-enter" style={{ animationDelay: '400ms' }}>
            Potencia, control y velocidad. Descubre la nueva línea de palas diseñadas para jugadores que no aceptan límites.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-enter" style={{ animationDelay: '600ms' }}>
            <Link
              href="/shop"
              className="group text-[12px] font-bold tracking-[0.3em] uppercase bg-trexx-red text-white px-12 py-5 hover:bg-red-700 transition-all duration-300 flex items-center gap-3"
            >
              Ver el Catálogo
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee text="TREXX PADEL • POTENCIA • CONTROL • VELOCIDAD •" />

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center space-y-6 animate-enter">
            <Zap className="w-10 h-10 text-trexx-volt" />
            <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Máxima Potencia</h3>
            <p className="text-[12px] text-muted-foreground font-light px-8 leading-relaxed">
              Materiales de carbono de última generación para golpes explosivos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6 animate-enter" style={{ animationDelay: '150ms' }}>
            <ShieldCheck className="w-10 h-10 text-trexx-volt" />
            <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Control Absoluto</h3>
            <p className="text-[12px] text-muted-foreground font-light px-8 leading-relaxed">
              Punto dulce optimizado para colocar la bola exactamente donde quieras.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6 animate-enter" style={{ animationDelay: '300ms' }}>
            <Trophy className="w-10 h-10 text-trexx-volt" />
            <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Calidad Profesional</h3>
            <p className="text-[12px] text-muted-foreground font-light px-8 leading-relaxed">
              Testeadas por jugadores de élite en las canchas más exigentes.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider title="Equipamiento" subtitle="Elige tu arma" />

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[800px]">
          {/* Main Category (Palas) */}
          <Link href="/shop?category=palas" className="relative group overflow-hidden border border-border bg-card rounded-sm animate-enter">
            <div className="absolute inset-0 bg-neutral-900 transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-12 left-12 space-y-3 z-10">
              <h3 className="text-white text-5xl font-black tracking-wide uppercase italic">Palas</h3>
              <p className="text-trexx-volt text-[12px] tracking-[0.3em] uppercase font-bold">Descubre el catálogo</p>
              <div className="pt-6 overflow-hidden">
                <span className="text-white text-[12px] tracking-[0.4em] uppercase border-b-2 border-trexx-red pb-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 inline-block font-bold">
                  Ver Colección
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary Categories */}
          <div className="flex flex-col gap-6">
            <Link href="/shop?category=zapatillas" className="relative group overflow-hidden border border-border bg-card rounded-sm flex-1 animate-enter" style={{ animationDelay: '150ms' }}>
              <div className="absolute inset-0 bg-neutral-900 transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 space-y-2 z-10">
                <h3 className="text-white text-3xl font-black uppercase italic">Zapatillas</h3>
                <span className="text-trexx-volt text-[10px] tracking-[0.3em] uppercase font-bold group-hover:text-trexx-red transition-colors">Comprar ahora &rarr;</span>
              </div>
            </Link>

            <div className="flex gap-6 flex-1">
              <Link href="/shop?category=indumentaria" className="relative group overflow-hidden border border-border bg-card rounded-sm flex-1 animate-enter" style={{ animationDelay: '300ms' }}>
                <div className="absolute inset-0 bg-neutral-900 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 space-y-2 z-10">
                  <h3 className="text-white text-2xl font-black uppercase italic">Indumentaria</h3>
                </div>
              </Link>
              <Link href="/shop?category=accesorios" className="relative group overflow-hidden border border-border bg-card rounded-sm flex-1 animate-enter" style={{ animationDelay: '450ms' }}>
                <div className="absolute inset-0 bg-neutral-900 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 space-y-2 z-10">
                  <h3 className="text-white text-2xl font-black uppercase italic">Accesorios</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="border-t border-border bg-gradient-to-b from-neutral-900 to-black py-20 mt-12 mb-12">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 animate-enter">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
            HASTA 6 CUOTAS SIN INTERÉS <br />
            <span className="text-trexx-volt text-3xl md:text-5xl mt-2 block">CON TODAS LAS TARJETAS</span>
          </h2>
          <p className="text-[14px] text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Estamos acá para ayudarte a elegir tu próximo equipamiento. Escribinos por WhatsApp y recibí asesoramiento personalizado de inmediato.
          </p>
          <div className="flex justify-center pt-4">
            <a
              href="https://wa.me/5493412272837?text=Hola!%20tengo%20una%20consulta%20por%20un%20producto%20Trexx"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[12px] font-bold tracking-[0.2em] uppercase bg-green-500 text-black px-10 py-4 rounded-full hover:bg-green-400 transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SectionDivider title="Destacados" subtitle="Lo más buscado" />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-32 space-y-12">
        <div className="flex items-end justify-between animate-enter">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight uppercase italic">Top Ventas</h2>
          </div>
          <Link
            href="/shop"
            className="text-[12px] font-bold tracking-[0.3em] uppercase text-trexx-volt hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            Ver Todo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="animate-enter" style={{ animationDelay: '200ms' }}>
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="border-t border-border bg-card py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 animate-enter">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
            SUMATE A LA <span className="text-trexx-red">REVOLUCIÓN</span>
          </h2>
          <p className="text-[12px] font-bold tracking-[0.3em] uppercase text-muted-foreground">Unite al club Trexx y conseguí beneficios exclusivos</p>
          <div className="max-w-md mx-auto flex gap-0 mt-8">
            <input
              type="email"
              placeholder="TU EMAIL"
              className="flex-1 bg-background border border-border px-4 py-4 text-[12px] font-bold tracking-widest uppercase focus:outline-none focus:border-trexx-volt transition-colors"
            />
            <button className="text-[12px] font-black tracking-[0.3em] uppercase bg-trexx-volt text-black px-8 py-4 hover:bg-trexx-red hover:text-white transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
