import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Package, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductVariantsTable } from '@/features/admin/products/components/ProductVariantsTable'
import { productsService } from '@repo/api-client'
import { createClient } from '@/shared/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function fetchProductAdmin(id: string) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || ''

  if (!token) return null
  return await productsService.getByIdAdmin(Number(id), token)
}

export default async function ProductVariantsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await fetchProductAdmin(id)
  if (!product) notFound()

  const variants = (product.product_variants || []).map((variant: any) => ({
    ...variant,
    sku: typeof variant.sku === 'string' ? variant.sku : null,
    price_modifier: typeof variant.price_modifier === 'number' ? variant.price_modifier : null,
  }))

  const primaryImage =
    product.product_images?.find((img: any) => img.is_primary)?.url ||
    product.product_images?.[0]?.url ||
    null

  const productColor = (product as any).color as {
    hex_code?: string
    name?: string
  } | undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-gray-900 w-fit px-0">
            <ArrowLeft size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Volver a Productos</span>
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {primaryImage ? (
              <div className="w-14 h-16 bg-gray-100 border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-14 h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-gray-400" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-trexx-red font-semibold tracking-wider uppercase mt-0.5">
                Gestión de variantes · {variants.length} variantes totales
              </p>
              {productColor && (
                <span className="inline-flex items-center gap-1.5 mt-1">
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: productColor.hex_code || '#888' }}
                  />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {productColor.name}
                  </span>
                </span>
              )}
            </div>
          </div>

          <Link href={`/admin/products/${product.id}/edit`}>
            <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase tracking-wider text-xs gap-2 border border-gray-200">
              <Pencil size={14} />
              Editar Producto / Fotos
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total variantes', value: variants.length },
          { label: 'Activas', value: variants.filter((v: any) => v.is_active).length },
          { label: 'Stock total', value: variants.filter((v: any) => v.is_active).reduce((s: number, v: any) => s + (v.stock || 0), 0) },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
            <p className="text-2xl font-black text-gray-900 tabular-nums">{stat.value}</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Variantes del producto
          </h2>
        </div>
        <ProductVariantsTable productId={product.id} initialVariants={variants} />
      </div>
    </div>
  )
}
