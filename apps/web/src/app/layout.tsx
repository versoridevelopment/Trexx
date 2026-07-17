import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/shared/components/layout'
import { Footer } from '@/shared/components/layout'
import { Preloader } from '@/shared/components/ui/Preloader'
import { CartProvider } from '@/features/cart/context/CartContext'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Trexx Padel Store',
  description: 'Tienda oficial de productos deportivos y equipamiento Trexx',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        <Preloader />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </CartProvider>
      </body>
    </html>
  )
}
