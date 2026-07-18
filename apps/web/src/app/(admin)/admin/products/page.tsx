import { productsService } from '@repo/api-client'
import Link from 'next/link'
import { Plus, Eye, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  let products: any[] = []
  try {
    products = await productsService.getAll()
  } catch (error) {
    console.error('Error fetching admin products:', error)
  }

  return (
    <div className="space-y-8 animate-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Gestión de Productos
          </h1>
          <p className="text-xs text-trexx-volt font-bold tracking-[0.2em] uppercase mt-1">
            Catálogo ({products.length} productos registrados)
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold tracking-wider uppercase text-xs gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            <Plus size={16} />
            <span>Nuevo Producto</span>
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-[#09090b] border border-white/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Imagen</th>
                <th className="py-4 px-6">Producto</th>
                <th className="py-4 px-6">Categoría</th>
                <th className="py-4 px-6">Precio</th>
                <th className="py-4 px-6">Imágenes</th>
                <th className="py-4 px-6">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground font-bold tracking-wider uppercase">
                    No hay productos registrados aún.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => {
                  const primaryImage =
                    product.product_images?.find((img: any) => img.is_primary)?.url ||
                    product.product_images?.[0]?.url ||
                    product.image ||
                    null

                  const imagesCount = product.product_images?.length || (product.image ? 1 : 0)

                  return (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-muted-foreground">
                        #{product.id}
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-12 h-14 bg-black border border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
                          {primaryImage ? (
                            <img
                              src={primaryImage}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[9px] text-muted-foreground uppercase font-bold">S/I</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white text-sm">
                        {product.name}
                      </td>
                      <td className="py-4 px-6 text-trexx-volt font-bold uppercase tracking-wider">
                        {product.categories?.name || 'Sin Categoría'}
                      </td>
                      <td className="py-4 px-6 font-black text-white tabular-nums text-sm">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-white/10 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-sm">
                          {imagesCount} {imagesCount === 1 ? 'foto' : 'fotos'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                            product.is_active
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {product.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link href={`/admin/products/new?duplicate_from=${product.id}`}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-trexx-volt hover:text-trexx-volt hover:bg-white/5" title="Añadir Variante de Color">
                            <Plus size={16} />
                          </Button>
                        </Link>
                        <Link href={`/admin/products/${product.id}/variants`}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white" title="Gestionar Variantes">
                            <Settings2 size={16} />
                          </Button>
                        </Link>
                        <Link href={`/shop/${product.slug || product.id}`} target="_blank">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white" title="Ver en Tienda">
                            <Eye size={16} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
