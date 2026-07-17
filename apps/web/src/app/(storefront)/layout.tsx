import { Navbar } from '@/shared/components/layout'
import { Footer } from '@/shared/components/layout'
import { CartSheet } from '@/features/cart/components/CartSheet'

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartSheet />
    </>
  )
}
