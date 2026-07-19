'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Eye, Trash2, RotateCcw, Loader2, Pencil } from 'lucide-react'
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
      toast.success(currentActive ? 'Producto dado de baja' : 'Producto reactivado')
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
            <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500">
              <th className="py-4 px-5">ID</th>
              <th className="py-4 px-5">Imagen</th>
              <th className="py-4 px-5">Producto</th>
              <th className="py-4 px-5">Categoría</th>
              <th className="py-4 px-5">Precio</th>
              <th className="py-4 px-5">Imágenes</th>
              <th className="py-4 px-5">Estado</th>
              <th className="py-4 px-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400 font-semibold tracking-wider uppercase text-xs">
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
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition-colors ${product.is_active ? '' : 'opacity-50'}`}
                  >
                    <td className="py-4 px-5 font-mono font-bold text-gray-400 text-xs">
                      #{product.id}
                    </td>
                    <td className="py-4 px-5">
                      <div className="w-12 h-14 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                        {primaryImage ? (
                          <img
                            src={primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] text-gray-400 uppercase font-bold">S/I</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-bold text-gray-900 text-sm">
                      {product.name}
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-trexx-red bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                        {product.categories?.name || 'Sin Categoría'}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-black text-gray-900 tabular-nums text-sm">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-5">
                      <span className="bg-gray-100 text-gray-600 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {imagesCount} {imagesCount === 1 ? 'foto' : 'fotos'}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                          product.is_active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-red-50 text-trexx-red border-red-200'
                        }`}
                      >
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right space-x-1">
                      {product.is_active && (
                        <Link href={`/admin/products/new?duplicate_from=${product.id}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-trexx-red hover:bg-red-50"
                            title="Añadir Variante de Color"
                          >
                            <Plus size={15} />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                          title="Editar Producto"
                        >
                          <Pencil size={15} />
                        </Button>
                      </Link>
                      <Link href={`/shop/${product.slug || product.id}`} target="_blank">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                          title="Ver en Tienda"
                        >
                          <Eye size={15} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={loadingId === product.id}
                        onClick={() => handleToggleActive(product.id, product.is_active)}
                        className={`h-8 w-8 p-0 ${
                          product.is_active
                            ? 'text-red-400 hover:text-trexx-red hover:bg-red-50'
                            : 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50'
                        }`}
                        title={product.is_active ? 'Dar de baja' : 'Reactivar'}
                      >
                        {loadingId === product.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : product.is_active ? (
                          <Trash2 size={15} />
                        ) : (
                          <RotateCcw size={15} />
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
