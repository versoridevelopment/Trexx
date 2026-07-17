'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Search, ShoppingBag, Menu, X, Shirt, Backpack } from 'lucide-react'
import { NavbarClient } from './NavbarClient'
import { useCart } from '@/features/cart/context/CartContext'

// Removed inline RacketIcon in favor of paletasvg.svg mask

interface LiquidNavbarProps {
  user: {
    email: string
    name?: string | null
  } | null
}

export const LiquidNavbar = ({ user }: LiquidNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop & Mobile Floating Pill */}
      <header className={`fixed top-4 left-4 right-4 z-50 mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'max-w-[380px]' : 'max-w-4xl'}`}>
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-6 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          {/* Logo */}
          <Link href="/" title="Inicio" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/trexx/logo.png" 
              alt="Trexx Padel" 
              width={100} 
              height={30} 
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation (Icons that collapse on scroll) */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 hidden md:flex overflow-hidden transition-all duration-500 ease-in-out ${
              isScrolled ? 'opacity-0 pointer-events-none scale-90 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <nav className="flex items-center gap-10 whitespace-nowrap">
              <Link href="/shop?category=indumentaria" title="Indumentaria" className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all">
                <Shirt size={20} />
              </Link>
              <Link href="/shop?category=palas" title="Palas" className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all flex items-center justify-center">
                <div 
                  className="w-8 h-8 bg-current" 
                  style={{ 
                    WebkitMaskImage: 'url(/navbar/padel2.svg)', 
                    WebkitMaskSize: 'contain', 
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskImage: 'url(/navbar/padel2.svg)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center'
                  }} 
                />
              </Link>
              <Link href="/shop?category=accesorios" title="Accesorios" className="text-white/70 hover:text-trexx-volt hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all">
                <Backpack size={20} />
              </Link>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5 ml-auto">
            <button title="Buscar" className="text-white/70 hover:text-white transition-colors">
              <Search size={18} strokeWidth={2} />
            </button>
            <button title="Carrito" onClick={() => setIsCartOpen(true)} className="text-white/70 hover:text-white transition-colors relative group">
              <ShoppingBag size={18} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-trexx-red text-[9px] text-white font-bold transition-opacity">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            {user ? (
              <NavbarClient user={user} />
            ) : (
              <Link href="/login" className="text-[10px] font-bold tracking-[0.2em] uppercase bg-white text-black px-5 py-2 rounded-full hover:bg-trexx-volt transition-colors">
                Ingresar
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4 ml-auto">
            <button title="Carrito" onClick={() => setIsCartOpen(true)} className="text-white/70 hover:text-trexx-volt transition-colors relative group">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-trexx-red text-[9px] text-white font-bold transition-opacity">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <NavbarClient user={user} />
            ) : (
              <Link href="/login" className="text-[10px] font-bold tracking-[0.1em] uppercase bg-white text-black px-3 py-1.5 rounded-full hover:bg-trexx-volt transition-colors">
                Ingresar
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button title="Menú" onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white hover:text-trexx-volt transition-colors ml-4">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 animate-enter">
          <button title="Cerrar Menú" onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-trexx-volt transition-colors">
            <X size={32} />
          </button>
          <Link href="/shop?category=indumentaria" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <Shirt size={32} /> INDUMENTARIA
          </Link>
          <Link href="/shop?category=palas" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-3xl font-black italic uppercase text-white hover:text-trexx-volt transition-colors">
            <div 
              className="w-10 h-10 bg-current -ml-1" 
              style={{ 
                WebkitMaskImage: 'url(/navbar/padel2.svg)', 
                WebkitMaskSize: 'contain', 
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/navbar/padel2.svg)',
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
            <button className="text-white hover:text-trexx-volt transition-colors"><Search size={24} /></button>
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
