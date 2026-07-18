'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Sliders, ArrowLeft } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin/products', icon: Package },
  { label: 'Categorías', href: '/admin/categories', icon: Tag },
  { label: 'Atributos', href: '/admin/attributes', icon: Sliders },
  { label: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Usuarios', href: '/admin/users', icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#09090b] border-r border-white/10 flex flex-col justify-between flex-shrink-0 min-h-screen">
      <div className="p-6 space-y-8">
        {/* Brand Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              TREXX
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-trexx-volt text-black px-2 py-0.5 rounded-sm">
              ADMIN
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            Control Center
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
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

      {/* Bottom Store Link */}
      <div className="p-6 border-t border-white/10">
        <Link
          href="/shop"
          className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-muted-foreground hover:text-trexx-volt transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>
      </div>
    </aside>
  )
}
