import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 animate-enter">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-trexx-volt blur-[30px] opacity-20 rounded-full" />
            <CheckCircle2 size={100} className="text-trexx-volt relative z-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            ¡ORDEN RECIBIDA!
          </h1>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed">
            Tu pago ha sido procesado exitosamente y estamos preparando tu equipamiento. 
            Recibirás un email con los detalles de tu envío pronto.
          </p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <Link href="/shop" className="w-full">
            <Button className="w-full h-14 bg-white text-black hover:bg-trexx-volt text-xs font-black italic tracking-[0.2em] uppercase rounded-sm transition-all flex items-center justify-center gap-2">
              SEGUIR COMPRANDO
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
