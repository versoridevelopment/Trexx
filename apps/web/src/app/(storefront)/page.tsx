import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/shared/lib/supabase/server'
import { productsService, settingsService } from '@repo/api-client'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { HeroSlider } from '@/features/home/components/HeroSlider'
import { ArrowRight, Zap, ShieldCheck, Trophy } from 'lucide-react'
import { InfiniteMarquee } from '@/shared/components/ui/InfiniteMarquee'
import { SectionDivider } from '@/shared/components/ui/SectionDivider'
import { DirectionAwareHover } from '@/shared/components/ui/aceternity/direction-aware-hover'
import { Meteors } from '@/shared/components/ui/aceternity/meteors'
import { Button as MovingBorderButton } from '@/shared/components/ui/aceternity/moving-border'
import { BackgroundGradient } from '@/shared/components/ui/aceternity/background-gradient'


export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [products, heroSlides, marqueeConfig, equipmentConfig, featuredProductsConfig] = await Promise.all([
    productsService.getAll(),
    settingsService.getByKey('home_hero_slides'),
    settingsService.getByKey('home_marquee_config'),
    settingsService.getByKey('home_equipment_config'),
    settingsService.getByKey('home_featured_products')
  ])

  // Process featured products based on config
  let featured = products.slice(0, 4) // default
  if (featuredProductsConfig && Array.isArray(featuredProductsConfig) && featuredProductsConfig.length > 0) {
    featured = featuredProductsConfig
      .map((id: string) => products.find((p: any) => p.id.toString() === id))
      .filter(Boolean) as typeof products
  }

  // Helper for equipment
  const getEq = (cat: string) => equipmentConfig?.[cat] || { url: '', media_type: 'image' }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative mt-16 aspect-[16/8] sm:aspect-[21/9] w-full flex items-center justify-center overflow-hidden bg-black border-b border-border">
        <HeroSlider slides={heroSlides} />
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee {...marqueeConfig} />

      {/* Brand Values */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-card border border-border rounded-3xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full">
                <Zap className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Máxima Potencia</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Materiales de carbono de última generación para golpes explosivos.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card border border-border rounded-3xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full">
                <ShieldCheck className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Control Absoluto</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Punto dulce optimizado para colocar la bola exactamente donde quieras.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card border border-border rounded-3xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-full">
                <Trophy className="w-10 h-10 text-trexx-volt" />
              </div>
              <h3 className="text-[12px] tracking-[0.3em] font-black uppercase text-foreground">Calidad Profesional</h3>
              <p className="text-[12px] text-muted-foreground font-light leading-relaxed">
                Testeadas por jugadores profesionales en las canchas más exigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider title="Equipamiento" />

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[800px]">
          {/* Main Category (Palas) */}
          <Link href="/shop?category=palas" className="relative group overflow-visible rounded-3xl animate-enter block h-full">
            <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
              <DirectionAwareHover imageUrl={getEq('palas').url} mediaType={getEq('palas').media_type}>
                <h3 className="text-white text-5xl font-black tracking-wide uppercase italic">Palas</h3>
              </DirectionAwareHover>
            </BackgroundGradient>
          </Link>

          {/* Secondary Categories */}
          <div className="flex flex-col gap-8 h-full">
            <Link href="/shop?category=zapatillas" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '150ms' }}>
              <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                <DirectionAwareHover className="h-full" imageUrl={getEq('zapatillas').url} mediaType={getEq('zapatillas').media_type}>
                  <h3 className="text-white text-3xl font-black uppercase italic">Zapatillas</h3>
                </DirectionAwareHover>
              </BackgroundGradient>
            </Link>

            <div className="flex gap-8 flex-1">
              <Link href="/shop?category=indumentaria" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '300ms' }}>
                <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                  <DirectionAwareHover className="h-full" imageUrl={getEq('indumentaria').url} mediaType={getEq('indumentaria').media_type}>
                    <h3 className="text-white text-2xl font-black uppercase italic">Indumentaria</h3>
                  </DirectionAwareHover>
                </BackgroundGradient>
              </Link>
              <Link href="/shop?category=accesorios" className="relative group overflow-visible rounded-3xl flex-1 animate-enter block" style={{ animationDelay: '450ms' }}>
                <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full rounded-3xl overflow-hidden bg-card">
                  <DirectionAwareHover className="h-full" imageUrl={getEq('accesorios').url} mediaType={getEq('accesorios').media_type}>
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
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
            HASTA 6 CUOTAS SIN INTERÉS <br />
            <span className="text-trexx-volt text-3xl md:text-5xl mt-2 block">
              CON TODAS LAS TARJETAS
            </span>
          </h2>
          <p className="text-[14px] text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Estamos acá para ayudarte a elegir tu próximo equipamiento. Escribinos por nuestras redes y recibí asesoramiento personalizado de inmediato.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
            <a
              href="https://wa.me/5493412272837?text=Hola!%20tengo%20una%20consulta%20por%20un%20producto%20Trexx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 h-14 flex justify-center items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase text-white bg-[#25D366] hover:bg-[#1DA851] rounded-full transition-colors shadow-lg shadow-[#25D366]/20"
            >
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/trexxpadel"
              target="_blank"
              rel="noopener noreferrer"
              className="w-64 h-14 flex justify-center items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] hover:opacity-90 rounded-full transition-opacity shadow-lg shadow-[#E1306C]/20"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <SectionDivider title="Destacados" />

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
