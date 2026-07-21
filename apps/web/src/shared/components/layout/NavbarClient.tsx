'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { LogOut, User, Settings, Package } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logoutAction } from '@/features/auth/actions/logout'

interface NavbarClientProps {
  user: {
    email: string
    name?: string | null
    role?: string
  }
}

export function NavbarClient({ user }: NavbarClientProps) {
  const [isPending, startTransition] = useTransition()
  const initial = (user.name ?? user.email).charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none group">
          <Avatar className="h-9 w-9 cursor-pointer border border-border/60 transition-colors group-hover:border-foreground/40 rounded-full">
            <AvatarFallback className="bg-muted text-foreground text-[10px] font-medium tracking-tighter">
              {initial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-none border-border/60">
        <DropdownMenuLabel className="px-2 py-3">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold leading-none text-foreground uppercase tracking-widest">
              {user.name ?? 'Usuario'}
            </p>
            <p className="text-[10px] leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        
        <div className="py-1">
          {user.role === 'admin' && (
            <DropdownMenuItem asChild className="rounded-none px-2 py-2 focus:bg-muted cursor-pointer transition-colors group">
              <Link href="/admin" className="flex items-center gap-3 w-full text-trexx-red">
                <Settings size={14} className="text-trexx-red group-hover:text-red-500 transition-colors" />
                <span className="text-[11px] tracking-widest uppercase font-bold text-trexx-red group-hover:text-red-500 transition-colors">Panel Administrador</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild className="rounded-none px-2 py-2 focus:bg-muted cursor-pointer transition-colors group">
            <Link href="/profile" className="flex items-center gap-3 w-full">
              <User size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-[11px] tracking-widest uppercase">Mi Perfil</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="rounded-none px-2 py-2 focus:bg-muted cursor-pointer transition-colors group">
            <Link href="/orders" className="flex items-center gap-3 w-full">
              <Package size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-[11px] tracking-widest uppercase">Mis Pedidos</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="rounded-none px-2 py-2 focus:bg-muted cursor-pointer transition-colors group">
            <Link href="/settings" className="flex items-center gap-3 w-full">
              <Settings size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-[11px] tracking-widest uppercase">Ajustes</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-border/40" />
        <div className="py-1">
          <DropdownMenuItem 
            onSelect={(e) => {
              e.preventDefault()
              startTransition(() => {
                logoutAction()
              })
            }}
            disabled={isPending}
            className="rounded-none px-2 py-2 focus:bg-destructive/10 cursor-pointer transition-colors group flex items-center gap-3 w-full text-destructive"
          >
            <LogOut size={14} />
            <span className="text-[11px] tracking-widest uppercase">{isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
