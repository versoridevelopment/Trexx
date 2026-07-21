'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Search, ShoppingBag, Menu, X, Shirt, Backpack, LayoutGrid } from 'lucide-react'
import { NavbarClient } from './NavbarClient'
import { useCart } from '@/features/cart/context/CartContext'

// Removed inline RacketIcon in favor of paletasvg.svg mask

interface LiquidNavbarProps {
  user: {
    email: string
    name?: string | null
    role?: string
  } | null
}

export const LiquidNavbar = ({ user }: LiquidNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <>
      {/* Full-width Fixed Top Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
          
          {/* 1. Izquierda Extrema: Menú Móvil + Logo de Trexx */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-white/70 hover:text-white p-1" 
              onClick={() => setIsMobileMenuOpen(true)}
              title="Abrir Menú"
            >
              <Menu size={24} />
            </button>
            <Link href="/" title="Inicio" className="flex items-center hover:opacity-80 transition-opacity">
              <Image 
                src="/trexx/logo.png" 
                alt="Trexx Padel" 
                width={110} 
                height={32} 
                className="object-contain"
              />
            </Link>
          </div>

          {/* 2. Centro: Navegación de Iconos (Absolutamente Centrado, oculto en móvil) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10">
            {/* Todos los Productos */}
            <Link 
              href="/shop" 
              title="Todos los Productos" 
              className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all p-1"
            >
              <LayoutGrid size={22} />
            </Link>

            <Link 
              href="/shop?category=indumentaria" 
              title="Indumentaria" 
              className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all p-1"
            >
              <Shirt size={22} />
            </Link>

            <Link 
              href="/shop?category=palas" 
              title="Palas" 
              className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all p-1 flex items-center justify-center"
            >
              <div 
                className="w-[26px] h-[26px] bg-current" 
                style={{ 
                  WebkitMaskImage: 'url(/navbar/paleta.png)', 
                  WebkitMaskSize: 'contain', 
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url(/navbar/paleta.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center'
                }} 
              />
            </Link>

            <Link 
              href="/shop?category=accesorios" 
              title="Accesorios" 
              className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all p-1"
            >
              <Backpack size={22} />
            </Link>
          </nav>

          {/* 3. Derecha Extrema: Buscador, Carrito, Perfil/Login */}
          <div className="flex items-center gap-3 sm:gap-5">

            <button title="Carrito" onClick={() => setIsCartOpen(true)} className="text-white/70 hover:text-white transition-colors relative p-1 group">
              <ShoppingBag size={20} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-trexx-red text-[9px] text-white font-bold shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

            {user ? (
              <NavbarClient user={user} />
            ) : (
              <Link 
                href="/login" 
                className="text-[11px] font-bold tracking-[0.2em] uppercase bg-white text-black px-4 py-2 rounded-full hover:bg-trexx-volt transition-colors"
              >
                Ingresar
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 animate-enter">
          <button title="Cerrar Menú" onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-trexx-volt transition-colors">
            <X size={32} />
          </button>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <LayoutGrid size={32} /> CATÁLOGO COMPLETO
          </Link>
          <Link href="/shop?category=indumentaria" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <Shirt size={32} /> INDUMENTARIA
          </Link>
          <Link href="/shop?category=palas" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <div 
              className="w-9 h-9 bg-current -ml-1" 
              style={{ 
                WebkitMaskImage: 'url(/navbar/paleta.png)', 
                WebkitMaskSize: 'contain', 
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/navbar/paleta.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }} 
            /> 
            PALAS
          </Link>
          <Link href="/shop?category=accesorios" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <Backpack size={32} /> ACCESORIOS
          </Link>
          
          <div className="w-12 h-1 bg-trexx-red my-4" />
          
          <div className="flex gap-6 items-center">
            <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="text-white hover:text-trexx-volt transition-colors relative">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-trexx-red text-[9px] text-white font-bold transition-opacity">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <NavbarClient user={user} />
            ) : (
              <Link href="/login" className="text-[12px] font-bold tracking-[0.2em] uppercase bg-trexx-volt text-black px-6 py-3 hover:bg-trexx-red hover:text-white transition-colors">
                Ingresar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
