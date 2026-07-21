'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { settingsService } from '@repo/api-client'
import type { components } from '@repo/api-client/src/types/api'
import { createClient } from '@/shared/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, GripVertical, Trash2, Search, Plus } from 'lucide-react'
import { toast } from 'sonner'

type Product = components['schemas']['Product']

export type FeaturedProductsConfig = string[] // array of ids

interface FeaturedProductsManagerProps {
  initialConfig: FeaturedProductsConfig | null
  allProducts: Product[]
}

export function FeaturedProductsManager({ initialConfig, allProducts }: FeaturedProductsManagerProps) {
  const router = useRouter()
  const [config, setConfig] = useState<FeaturedProductsConfig>(initialConfig || [])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // The products currently selected, in order
  const selectedProducts = config
    .map(id => allProducts.find(p => p.id.toString() === id))
    .filter((p): p is Product => p !== undefined)

  // Products available to be added
  const availableProducts = allProducts.filter(p => 
    !config.includes(p.id.toString()) && 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5) // Show top 5 matches

  const handleAddProduct = (id: string) => {
    setConfig(prev => [...prev, id])
    setSearchQuery('')
  }

  const handleRemoveProduct = (id: string) => {
    setConfig(prev => prev.filter(s => s !== id))
  }

  const moveProduct = (id: string, direction: 'up' | 'down') => {
    const newConfig = [...config]
    const index = newConfig.indexOf(id)
    if (index === -1) return

    if (direction === 'up' && index > 0) {
      ;[newConfig[index - 1], newConfig[index]] = [newConfig[index], newConfig[index - 1]]
    } else if (direction === 'down' && index < newConfig.length - 1) {
      ;[newConfig[index + 1], newConfig[index]] = [newConfig[index], newConfig[index + 1]]
    }
    setConfig(newConfig)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()
      
      if (!session) {
        toast.error('Sesión no encontrada')
        return
      }

      await settingsService.updateByKey('home_featured_products', config, session.access_token)
      toast.success('Destacados guardados correctamente')
      router.refresh()
    } catch (err: any) {
      toast.error('Error al guardar destacados')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100 max-w-3xl mt-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Productos Destacados</h2>
        <p className="text-xs text-gray-500 mt-1">
          Selecciona y ordena los productos que se mostrarán en la sección "Destacados" / "Top Ventas".
        </p>
      </div>

      {/* Selected Products List */}
      <div className="space-y-3 mb-8">
        {selectedProducts.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No hay productos destacados seleccionados.
          </p>
        ) : (
          selectedProducts.map((product, index) => (
            <div key={product.id.toString()} className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:border-gray-300 transition-colors">
              <div className="flex flex-col gap-1 text-gray-400">
                <button 
                  onClick={() => moveProduct(product.id.toString(), 'up')} 
                  disabled={config.indexOf(product.id.toString()) === 0} 
                  className="hover:text-black disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </button>
                <button 
                  onClick={() => moveProduct(product.id.toString(), 'down')} 
                  disabled={config.indexOf(product.id.toString()) === config.length - 1} 
                  className="hover:text-black disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
              </div>
              
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1 border border-gray-100 flex-shrink-0">
                <img src={product.product_images?.[0]?.url || '/placeholder.png'} alt={product.name} className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-gray-900">{product.name}</p>
                <p className="text-[10px] uppercase text-gray-500 tracking-wider">{product.categories?.name || 'Sin Categoría'}</p>
              </div>

              <button 
                onClick={() => handleRemoveProduct(product.id.toString())}
                className="p-2 text-gray-400 hover:text-trexx-red hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Product Search */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8">
        <h3 className="text-xs font-bold uppercase mb-3 text-gray-700">Añadir Producto</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-trexx-red"
          />
        </div>
        
        {searchQuery && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {availableProducts.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-2">No se encontraron productos.</p>
            ) : (
              availableProducts.map(product => (
                <div key={product.id.toString()} className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={product.product_images?.[0]?.url || '/placeholder.png'} alt={product.name} className="w-8 h-8 object-contain" />
                    <p className="text-xs font-medium truncate">{product.name}</p>
                  </div>
                  <button 
                    onClick={() => handleAddProduct(product.id.toString())}
                    className="p-1.5 text-trexx-red hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-trexx-red text-white hover:bg-red-700 font-bold uppercase tracking-wider text-xs px-8"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin mr-2" />
          ) : null}
          Guardar Destacados
        </Button>
      </div>
    </div>
  )
}
