import Link from 'next/link'
import Image from 'next/image'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex flex-col">
      {/* Checkout Minimal Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/shop" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/trexx/logo.png" 
              alt="Trexx Padel" 
              width={100} 
              height={30} 
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
            <span>Pago Seguro</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trexx-volt"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
