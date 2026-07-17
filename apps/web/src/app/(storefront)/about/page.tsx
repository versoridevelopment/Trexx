import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Section 1: Hero Heritage */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about/heritage.png"
          alt="Alexandria Heritage"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <div className="space-y-4">
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/60 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-light">
              Legado & Distinción
            </p>
            <h1 className="text-5xl md:text-9xl font-extralight tracking-tighter text-white leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 uppercase">
              EL RIGOR DE LA <br /> <span className="italic font-light">SOBRIEDAD</span>
            </h1>
          </div>
          <p className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            En un mundo de lo efímero, ALEXANDRIA nace como un refugio para el hombre que exige permanencia. Nuestra historia se escribe a través de la calidad sin concesiones y la búsqueda incansable de la perfección técnica.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <div className="w-[1px] h-16 bg-white" />
        </div>
      </section>

      {/* Section 2: Craftsmanship Detail */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative h-[700px] w-full overflow-hidden group">
            <Image
              src="/about/craftsmanship.png"
              alt="Artisanal Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="space-y-10">
            <p className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-light">Artesanía de Autor</p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight uppercase">
              Honramos el oficio por encima de la tendencia.
            </h2>
            <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
              <p className="text-sm md:text-base">
                Creemos que el verdadero lujo reside en la integridad de los materiales. Nuestra selección es el resultado de una curaduría exhaustiva de fibras naturales y procesos artesanales que respetan el tiempo de creación.
              </p>
              <p className="text-sm md:text-base">
                Cada costura, cada acabado y cada aroma en nuestra línea de perfumería es un compromiso con la excelencia. Diseñamos piezas fundamentales que se integran al legado personal de cada caballero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vision/Philosophy Grid */}
      <section className="bg-accent/10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Excelencia Técnica</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                Colaboramos con maestros artesanos que comparten nuestra visión de rigor ético y estético en cada fibra.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Soberanía Estética</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                Nuestras líneas son arquitectónicas, nuestros colores profundos. Un uniforme de distinción para la vida moderna.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] font-semibold uppercase text-foreground">Impacto Consciente</h3>
              <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                Menos volumen, mayor longevidad. Un manifiesto contra la cultura del descarte, enfocado en el valor real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Studio Aesthetic */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about/showroom.png"
          alt="Alexandria Showroom"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.5]"
        />
        <div className="relative z-10 text-center space-y-10 px-6 max-w-4xl">
           <h2 className="text-3xl md:text-6xl font-extralight tracking-tighter text-white italic leading-tight">
             "Buscamos la armonía absoluta entre el espacio, la pieza y el caballero."
           </h2>
           <div className="pt-10">
             <Link
               href="/products"
               className="inline-flex items-center gap-3 text-[10px] tracking-[0.5em] uppercase text-white border-b border-white/30 pb-3 hover:border-white transition-all group"
             >
               Explorar Colección
               <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
             </Link>
           </div>
        </div>
      </section>

      {/* Footer Space padding */}
      <div className="h-20" />
    </div>
  )
}
