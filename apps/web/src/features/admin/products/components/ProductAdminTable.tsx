'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Eye, Settings2, Trash2, RotateCcw, Loader2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { toggleProductActiveAction } from '../actions'
import type { AdminProduct } from '../types'

interface ProductAdminTableProps {
  initialProducts: AdminProduct[]
}

export function ProductAdminTable({ initialProducts }: ProductAdminTableProps) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  // Sincronizar productos si cambian por revalidación del servidor
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleToggleActive = async (id: number, currentActive: boolean) => {
    setLoadingId(id)
    try {
      const res = await toggleProductActiveAction(id, currentActive)

      if (!res.success) {
        throw new Error(res.error || 'Error al cambiar estado del producto')
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: !currentActive } : p))
      )
      toast.success(currentActive ? 'Producto dado de baja correctamente' : 'Producto reactivado correctamente')
    } catch (error: any) {
      toast.error(error.message || 'Error de red al actualizar estado')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="w-full">
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
              products.map((product) => {
                const primaryImage =
                  product.product_images?.find((img: any) => img.is_primary)?.url ||
                  product.product_images?.[0]?.url ||
                  product.image ||
                  null

                const imagesCount = product.product_images?.length || (product.image ? 1 : 0)

                return (
                  <tr key={product.id} className={`hover:bg-white/5 transition-colors ${product.is_active ? '' : 'opacity-40'}`}>
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
                      {product.is_active && (
                        <Link href={`/admin/products/new?duplicate_from=${product.id}`}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-trexx-volt hover:text-trexx-volt hover:bg-white/5" title="Añadir Variante de Color">
                            <Plus size={16} />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white" title="Editar Producto / Variantes">
                          <Pencil size={16} />
                        </Button>
                      </Link>
                      <Link href={`/shop/${product.slug || product.id}`} target="_blank">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white" title="Ver en Tienda">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={loadingId === product.id}
                        onClick={() => handleToggleActive(product.id, product.is_active)}
                        className={`h-8 w-8 p-0 ${product.is_active ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'}`}
                        title={product.is_active ? 'Dar de baja' : 'Reactivar'}
                      >
                        {loadingId === product.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : product.is_active ? (
                          <Trash2 size={16} />
                        ) : (
                          <RotateCcw size={16} />
                        )}
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
