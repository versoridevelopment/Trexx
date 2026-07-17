import { createClient } from '@/shared/lib/supabase/server'
import { LiquidNavbar } from './LiquidNavbar'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <LiquidNavbar user={user} />
}
