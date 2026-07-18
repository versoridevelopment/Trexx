import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductVariantsTable } from '@/features/admin/products/components/ProductVariantsTable'

import { createClient } from '@/shared/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function fetchProductAdmin(id: string) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || ''

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  const res = await fetch(`${apiUrl}/api/products/admin/${id}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) return null
  return res.json()
}

export default async function ProductVariantsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await fetchProductAdmin(id)
  if (!product) notFound()

  // Las variantes del producto vienen embebidas en el producto admin
  const variants = product.product_variants || []

  const primaryImage =
    product.product_images?.find((img: any) => img.is_primary)?.url ||
    product.product_images?.[0]?.url ||
    null

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white w-fit px-0">
            <ArrowLeft size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Volver a Productos</span>
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          {primaryImage ? (
            <div className="w-14 h-16 bg-black border border-white/10 rounded-sm overflow-hidden flex-shrink-0">
              <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-14 h-16 bg-black border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
              <Package size={20} className="text-muted-foreground" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              {product.name}
            </h1>
            <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-0.5">
              Gestión de variantes · {variants.length} variantes totales
            </p>
            {product.color && (
              <span className="inline-flex items-center gap-1.5 mt-1">
                <span
                  className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                  style={{ backgroundColor: product.color.hex_code || '#888' }}
                />
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  {product.color.name}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total variantes', value: variants.length },
          { label: 'Activas', value: variants.filter((v: any) => v.is_active).length },
          { label: 'Stock total', value: variants.filter((v: any) => v.is_active).reduce((s: number, v: any) => s + (v.stock || 0), 0) },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#09090b] border border-white/10 rounded-sm p-4 text-center">
            <p className="text-2xl font-black text-white tabular-nums">{stat.value}</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#09090b] border border-white/10 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Variantes del producto
          </h2>
        </div>
        <ProductVariantsTable productId={product.id} initialVariants={variants} />
      </div>
    </div>
  )
}
