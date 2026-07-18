import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/shared/lib/supabase/server'
import { productsService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { ArrowRight, Zap, ShieldCheck, Trophy } from 'lucide-react'
import { InfiniteMarquee } from '@/shared/components/ui/InfiniteMarquee'
import { SectionDivider } from '@/shared/components/ui/SectionDivider'
import { DirectionAwareHover } from '@/shared/components/ui/aceternity/direction-aware-hover'
import { Meteors } from '@/shared/components/ui/aceternity/meteors'
import { Button as MovingBorderButton } from '@/shared/components/ui/aceternity/moving-border'
import { GlowingEffect } from '@/shared/components/ui/aceternity/glowing-effect'
import { BackgroundGradient } from '@/shared/components/ui/aceternity/background-gradient'
import { FlipWords } from '@/shared/components/ui/aceternity/flip-words'

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
        {/* Banner image or video container */}
        <div className="absolute inset-0 bg-neutral-900 z-0">
          {/* Aquí iría la etiqueta <Image /> o <video />. Mantenemos el fondo oscuro por defecto. */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 to-black/90 z-0" />

        {/* Radial subtle glow in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trexx-red/10 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl flex flex-col items-center justify-center">
          <div className="space-y-4">
            <p className="text-[12px] md:text-sm tracking-[0.6em] uppercase text-trexx-volt drop-shadow-sm animate-enter font-bold">
              Nueva Colección 2026
            </p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[0.85] animate-enter" style={{ animationDelay: '200ms' }}>
              DOMINA LA <br />
              <FlipWords
                words={["CANCHA", "RED", "POTENCIA", "VOLEA"]}
                className="text-trexx-red drop-shadow-lg p-0 m-0"
              />
            </h1>
          </div>
          <p className="text-sm md:text-xl text-white/80 max-w-xl mx-auto font-light leading-relaxed drop-shadow-md animate-enter" style={{ animationDelay: '400ms' }}>
            Potencia, control y velocidad. Descubre la nueva línea de palas diseñadas para jugadores que no aceptan límites.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-enter" style={{ animationDelay: '600ms' }}>
            <MovingBorderButton
              borderRadius="0.25rem"
              containerClassName="w-64 h-16"
              className="bg-black hover:bg-neutral-900 text-[12px] font-bold tracking-[0.3em] uppercase transition-colors"
              borderClassName="bg-[radial-gradient(#ccff00_40%,transparent_60%)]"
            >
              <Link
                href="/shop"
                className="flex items-center justify-center gap-3 w-full h-full text-white"
              >
                Ver el Catálogo
                <ArrowRight size={16} />
              </Link>
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee text="TREXX PADEL • POTENCIA • CONTROL • VELOCIDAD •" />

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlowingEffect className="p-8 group">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Máxima Potencia</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Materiales de carbono de última generación para golpes explosivos.
              </p>
            </div>
          </GlowingEffect>

          <GlowingEffect className="p-8 group">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Control Absoluto</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Punto dulce optimizado para colocar la bola exactamente donde quieras.
              </p>
            </div>
          </GlowingEffect>

          <GlowingEffect className="p-8 group">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Calidad Profesional</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Testeadas por jugadores de élite en las canchas más exigentes.
              </p>
            </div>
          </GlowingEffect>
        </div>
      </section>

      <SectionDivider title="Equipamiento" subtitle="Elige tu arma" />

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[800px]">
          {/* Main Category (Palas) */}
          <Link href="/shop?category=palas" className="relative group overflow-visible rounded-3xl animate-enter block h-full">
            <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
              <DirectionAwareHover imageUrl="https://ueyphnqgkwbvafsxewyu.supabase.co/storage/v1/object/public/store-assets/products/1784336698828-m1r5c8p1oq.png">
                <h3 className="text-white text-5xl font-black tracking-wide uppercase italic">Palas</h3>
                <p className="text-trexx-volt text-[12px] tracking-[0.3em] uppercase font-bold mt-2">Descubre el catálogo</p>
              </DirectionAwareHover>
            </BackgroundGradient>
          </Link>

          {/* Secondary Categories */}
          <div className="flex flex-col gap-8 h-full">
            <Link href="/shop?category=zapatillas" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '150ms' }}>
              <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                <DirectionAwareHover className="h-full">
                  <h3 className="text-white text-3xl font-black uppercase italic">Zapatillas</h3>
                  <span className="text-trexx-volt text-[10px] tracking-[0.3em] uppercase font-bold mt-2">Comprar ahora &rarr;</span>
                </DirectionAwareHover>
              </BackgroundGradient>
            </Link>

            <div className="flex gap-8 flex-1">
              <Link href="/shop?category=indumentaria" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '300ms' }}>
                <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                  <DirectionAwareHover className="h-full">
                    <h3 className="text-white text-2xl font-black uppercase italic">Indumentaria</h3>
                  </DirectionAwareHover>
                </BackgroundGradient>
              </Link>
              <Link href="/shop?category=accesorios" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '450ms' }}>
                <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                  <DirectionAwareHover className="h-full">
                    <h3 className="text-white text-2xl font-black uppercase italic">Accesorios</h3>
                  </DirectionAwareHover>
                </BackgroundGradient>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="border-t border-border bg-gradient-to-b from-neutral-900 to-black py-20 mt-12 mb-12 relative overflow-hidden">
        <Meteors number={20} />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 animate-enter relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
            HASTA 6 CUOTAS SIN INTERÉS <br />
            <span className="text-trexx-volt text-3xl md:text-5xl mt-2 block">
              CON TODAS LAS TARJETAS
            </span>
          </h2>
          <p className="text-[14px] text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Estamos acá para ayudarte a elegir tu próximo equipamiento. Escribinos por WhatsApp y recibí asesoramiento personalizado de inmediato.
          </p>
          <div className="flex justify-center pt-4">
            <MovingBorderButton
              borderRadius="2rem"
              containerClassName="w-80 h-16"
              className="bg-black hover:bg-neutral-900 transition-colors border-0"
              borderClassName="bg-[radial-gradient(#25D366_40%,transparent_60%)]"
            >
              <a
                href="https://wa.me/5493412272837?text=Hola!%20tengo%20una%20consulta%20por%20un%20producto%20Trexx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex justify-center items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase text-[#25D366]"
              >
                Contactar por WhatsApp
              </a>
            </MovingBorderButton>
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
