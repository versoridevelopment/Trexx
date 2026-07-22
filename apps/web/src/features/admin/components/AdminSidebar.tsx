'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Sliders, ArrowLeft, LogOut, ShieldCheck, User, Home, Menu, X } from 'lucide-react'
import { createClient } from '@/shared/lib/supabase/client'
import Image from 'next/image'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin/products', icon: Package },
  { label: 'Categorías', href: '/admin/categories', icon: Tag },
  { label: 'Atributos', href: '/admin/attributes', icon: Sliders },
  { label: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Usuarios', href: '/admin/users', icon: Users },
  { label: 'Home', href: '/admin/home-config', icon: Home },
]

interface AdminSidebarProps {
  userEmail?: string | null
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40 shadow-sm">
        <Link href="/admin" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/trexx/logo.png"
            alt="Trexx Padel"
            width={90}
            height={26}
            className="object-contain brightness-0"
          />
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
          title={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Fixed & Mobile Drawer) */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-50 overflow-hidden shadow-sm transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col overflow-y-auto">
          {/* Brand Header with Trexx Logo */}
          <div className="px-5 pt-6 pb-4 border-b border-gray-100 hidden md:block">
            <Link href="/admin" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/trexx/logo.png"
                alt="Trexx Padel"
                width={110}
                height={32}
                className="object-contain brightness-0"
              />
            </Link>
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mt-2">
              Panel de Administración
            </p>
          </div>

          <div className="px-5 pt-6 pb-4 border-b border-gray-100 md:hidden flex items-center justify-between">
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase">
              Menú
            </p>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-0.5 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${isActive
                    ? 'bg-red-50 text-trexx-red border border-red-100'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Icon size={16} className={isActive ? 'text-trexx-red' : 'text-gray-400'} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Section: User Profile & Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-trexx-red shrink-0">
            <User size={15} />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <p className="text-xs font-bold text-gray-800 tracking-wide truncate">
              {userEmail || 'Administrador'}
            </p>
            <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-trexx-red">
              <ShieldCheck size={9} />
              <span>Super Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation / Logout Actions */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-200">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Tienda</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide uppercase text-trexx-red hover:text-red-700 transition-colors"
          >
            <LogOut size={12} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}
