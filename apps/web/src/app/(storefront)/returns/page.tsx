import { SectionDivider } from '@/shared/components/ui/SectionDivider'
import { RefreshCcw, ShieldAlert, CheckCircle, Clock } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <SectionDivider title="Devoluciones" />
      
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black italic uppercase tracking-wider text-white">Políticas de Devolución</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
              Tu satisfacción es nuestra prioridad. Conocé bajo qué condiciones aceptamos devoluciones o cambios en tus productos Trexx.
            </p>
          </div>

          <div className="space-y-8 pt-8 border-t border-border/50">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Plazo de Cambios y Devoluciones</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tenés hasta 30 días de corrido contados a partir de la fecha en que recibís el producto para solicitar un cambio, y 10 días para devoluciones por arrepentimiento de compra.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Condiciones del Producto</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  El artículo debe estar sin uso, en el mismo estado en que lo recibiste y con su embalaje original intacto. Las palas no deben tener el precinto del grip alterado.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Garantía por Defectos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todas nuestras palas y equipamiento cuentan con garantía de fábrica de 3 a 6 meses (según producto) ante posibles fallas de manufactura. No cubrimos daños por mal uso o golpes.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Proceso de Cambio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comunicate por nuestros medios de atención informando tu número de pedido. Si el cambio se debe a un error nuestro, el envío de vuelta corre por nuestra cuenta. Si es por talle o modelo, los costos logísticos son a cargo del comprador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
