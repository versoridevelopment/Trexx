'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { LogOut, ShieldCheck, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  userEmail?: string | null
}

export function AdminHeader({ userEmail }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-16 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      {/* System Badge */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trexx-volt opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-trexx-volt"></span>
        </span>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">
          Sistema Operativo API 100%
        </span>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-right">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white tracking-wide">
              {userEmail || 'Administrador'}
            </p>
            <div className="flex items-center justify-end gap-1 text-[9px] font-bold tracking-widest uppercase text-trexx-volt">
              <ShieldCheck size={10} />
              <span>SUPER ADMIN</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-trexx-volt">
            <User size={18} />
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 text-xs font-bold tracking-wider uppercase gap-2"
        >
          <LogOut size={14} />
          <span>Salir</span>
        </Button>
      </div>
    </header>
  )
}
