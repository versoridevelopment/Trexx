import { SectionDivider } from '@/shared/components/ui/SectionDivider'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <SectionDivider title="Contacto" />
      
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black italic uppercase tracking-wider text-white">¿Tenés alguna duda?</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
              Estamos acá para ayudarte. Dejanos tu mensaje y nuestro equipo de soporte se pondrá en contacto con vos a la brevedad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border/50">
            {/* Info Column */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-trexx-volt">Información Directa</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-trexx-volt/10 transition-colors">
                    <Phone className="w-5 h-5 text-trexx-volt" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white mb-1">WhatsApp / Teléfono</h3>
                    <p className="text-sm text-muted-foreground">+54 9 341 227-2837</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-trexx-volt/10 transition-colors">
                    <Mail className="w-5 h-5 text-trexx-volt" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">contacto@trexxpadel.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-trexx-volt/10 transition-colors">
                    <MapPin className="w-5 h-5 text-trexx-volt" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white mb-1">Ubicación</h3>
                    <p className="text-sm text-muted-foreground">Rosario, Santa Fe, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-trexx-volt/10 transition-colors">
                    <Clock className="w-5 h-5 text-trexx-volt" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white mb-1">Horario de Atención</h3>
                    <p className="text-sm text-muted-foreground">Lunes a Viernes de 9:00 a 18:00hs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-trexx-volt">Envianos un mensaje</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nombre Completo</label>
                  <input id="name" type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-trexx-volt transition-colors" placeholder="Ej. Juan Pérez" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Correo Electrónico</label>
                  <input id="email" type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-trexx-volt transition-colors" placeholder="tu@email.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mensaje</label>
                  <textarea id="message" rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-trexx-volt transition-colors resize-none" placeholder="¿En qué te podemos ayudar?"></textarea>
                </div>

                <button type="button" className="w-full flex items-center justify-center gap-2 bg-trexx-volt text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
