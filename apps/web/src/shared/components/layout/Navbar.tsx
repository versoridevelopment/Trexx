import { createClient } from '@/shared/lib/supabase/server'
import { LiquidNavbar } from './LiquidNavbar'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const mappedUser = user && user.email ? {
    email: user.email,
    name: user.user_metadata?.name || user.user_metadata?.full_name || null,
    role: user.app_metadata?.role || user.user_metadata?.role || 'user'
  } : null;

  return <LiquidNavbar user={mappedUser} />
}
