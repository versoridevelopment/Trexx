import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm'
import { CheckoutSummary } from '@/features/checkout/components/CheckoutSummary'

export default async function CheckoutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/checkout')
  }

  // Obtenemos sesión del usuario para poder inyectar su token en apiFetch
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      {/* Lado Izquierdo: Formulario de Pago */}
      <div className="w-full lg:w-7/12 p-6 lg:p-16 flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">
            FINALIZAR COMPRA
          </h1>
          <CheckoutForm accessToken={session?.access_token} />
        </div>
      </div>

      {/* Lado Derecho: Resumen del Pedido (Sticky) */}
      <div className="w-full lg:w-5/12 bg-black border-l border-white/5 p-6 lg:p-16">
        <div className="lg:sticky lg:top-24">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}
