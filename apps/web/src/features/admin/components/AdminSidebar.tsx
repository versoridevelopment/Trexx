'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Sliders, ArrowLeft, LogOut, ShieldCheck, User } from 'lucide-react'
import { createClient } from '@/shared/lib/supabase/client'

import Image from 'next/image'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin/products', icon: Package },
  { label: 'Categorías', href: '/admin/categories', icon: Tag },
  { label: 'Atributos', href: '/admin/attributes', icon: Sliders },
  { label: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Usuarios', href: '/admin/users', icon: Users },
]

interface AdminSidebarProps {
  userEmail?: string | null
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#09090b] border-r border-white/10 flex flex-col justify-between z-50 overflow-hidden">
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Brand Header with Trexx Logo */}
        <div className="pb-2">
          <Link href="/admin" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/trexx/logo.png" 
              alt="Trexx Padel" 
              width={120} 
              height={36} 
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-trexx-volt/10 text-trexx-volt border-l-2 border-trexx-volt shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Section: User Profile & Actions */}
      <div className="p-4 border-t border-white/10 bg-[#060607] space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-trexx-volt shrink-0">
            <User size={16} />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <p className="text-xs font-bold text-white tracking-wide truncate">
              {userEmail || 'Administrador'}
            </p>
            <div className="flex items-center gap-1 text-[8px] font-bold tracking-widest uppercase text-trexx-volt">
              <ShieldCheck size={10} />
              <span>SUPER ADMIN</span>
            </div>
          </div>
        </div>

        {/* Navigation / Logout Actions */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Tienda</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut size={13} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
