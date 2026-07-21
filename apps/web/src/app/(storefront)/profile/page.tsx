import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { usersService } from '@repo/api-client'
import { ProfileForm } from '@/features/auth/components/ProfileForm'
import { SectionDivider } from '@/shared/components/ui/SectionDivider'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login?next=/profile')
  }

  let user = null
  try {
    user = await usersService.getMe(session.access_token)
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24 pb-12">
        <p className="text-white text-sm">Error al cargar el perfil. Por favor, intenta iniciar sesión nuevamente.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">

      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna Izquierda: Menú / Resumen */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-trexx-red/10 text-trexx-red mx-auto rounded-full flex items-center justify-center text-2xl font-black italic uppercase border border-trexx-red/20">
              {user.name ? user.name.charAt(0) : user.email.charAt(0)}
            </div>
            <div>
              <h2 className="text-white font-bold uppercase tracking-wider">{user.name || 'Usuario'}</h2>
              <p className="text-muted-foreground text-xs mt-1">{user.email}</p>
            </div>
          </div>

          <nav className="bg-card border border-border rounded-2xl overflow-hidden">
            <ul className="flex flex-col">
              <li>
                <div className="w-full text-left px-6 py-4 text-xs font-bold tracking-widest uppercase bg-white/5 text-trexx-volt border-l-2 border-trexx-volt">
                  Datos Personales
                </div>
              </li>
              <li>
                <div className="w-full text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground opacity-50 cursor-not-allowed border-t border-border">
                  Mis Direcciones
                </div>
              </li>
              <li>
                <div className="w-full text-left px-6 py-4 text-xs font-bold tracking-widest uppercase text-muted-foreground opacity-50 cursor-not-allowed border-t border-border">
                  Mis Pedidos
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Columna Derecha: Contenido */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-black italic uppercase text-white mb-6">Información Personal</h3>
            <ProfileForm user={user} accessToken={session.access_token} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 opacity-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black italic uppercase text-white">Direcciones de Envío</h3>
              <span className="bg-trexx-volt/20 text-trexx-volt text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-trexx-volt/30">
                En Construcción
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Pronto podrás gestionar tus direcciones de envío desde aquí para agilizar tus compras.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
