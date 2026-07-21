import { SectionDivider } from '@/shared/components/ui/SectionDivider'
import { Package, Truck, ShieldCheck, Map } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <SectionDivider title="Envíos" />
      
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black italic uppercase tracking-wider text-white">Políticas de Envío</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
              Llevamos el mejor equipamiento de pádel a cada rincón del país. Conocé nuestros métodos de envío, tiempos de entrega y costos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
            <div className="p-6 bg-background rounded-2xl border border-border/50 space-y-4">
              <div className="w-12 h-12 bg-trexx-volt/10 text-trexx-volt rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Envíos a todo el país</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trabajamos con las principales empresas de logística para asegurar que tu pedido llegue en perfectas condiciones a cualquier provincia de Argentina.
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border/50 space-y-4">
              <div className="w-12 h-12 bg-trexx-red/10 text-trexx-red rounded-full flex items-center justify-center mb-4">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Tiempos de Entrega</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Los tiempos de entrega estimados varían según tu ubicación. Por lo general, los despachos demoran entre 3 y 7 días hábiles tras la confirmación del pago.
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border/50 space-y-4">
              <div className="w-12 h-12 bg-white/5 text-white rounded-full flex items-center justify-center mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Costo de Envío</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El costo se calcula en base a tu código postal y al volumen de tu carrito en el proceso de compra. Contamos con promociones de envío gratis en compras superiores a montos especificados.
              </p>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border/50 space-y-4">
              <div className="w-12 h-12 bg-white/5 text-white rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Seguimiento</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Una vez despachado el paquete, te enviaremos por email el número de guía para que puedas rastrear el progreso de tu compra en tiempo real.
              </p>
            </div>
          </div>

          <div className="p-6 bg-trexx-volt/10 border border-trexx-volt/20 rounded-2xl text-center">
            <h4 className="text-trexx-volt font-bold uppercase tracking-widest text-sm mb-2">Importante</h4>
            <p className="text-xs text-trexx-volt/80">
              Cualquier consulta sobre el estado de tu pedido, no dudes en comunicarte por nuestros canales de atención al cliente.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
