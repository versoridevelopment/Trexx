'use client'

import { Layers, Package, Sparkles } from 'lucide-react'

interface AttributeValue {
  id: number
  value: string
}

interface AttributeType {
  id: number
  name: string
  slug: string
  attribute_values?: AttributeValue[]
}

export interface SelectedAttrValue {
  id: number
  value: string
  typeId: number
  typeName: string
  typeSlug: string
}

export interface GeneratedVariantEntry {
  key: string
  attributeValues: SelectedAttrValue[]
  sku: string
  stock: number
  priceModifier: number
}

interface ProductVariantSelectorProps {
  attributeTypes: AttributeType[]
  selectedAttrValues: SelectedAttrValue[]
  onToggleAttribute: (val: SelectedAttrValue) => void
  generatedVariants: GeneratedVariantEntry[]
  onUpdateVariant: (key: string, fields: Partial<GeneratedVariantEntry>) => void
  baseStock: number
  onBaseStockChange: (stock: number) => void
  variantMode: 'simple' | 'variable'
  onVariantModeChange: (mode: 'simple' | 'variable') => void
}

export function ProductVariantSelector({
  attributeTypes,
  selectedAttrValues,
  onToggleAttribute,
  generatedVariants,
  onUpdateVariant,
  baseStock,
  onBaseStockChange,
  variantMode,
  onVariantModeChange,
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-8 pt-4 border-t border-gray-200">
      <div className="space-y-1 border-b border-gray-200 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-trexx-red">
          3. Stock e Inventario
        </h2>
        <p className="text-xs text-gray-500">
          Define si el producto tiene características únicas o si cuenta con múltiples variaciones de stock.
        </p>
      </div>

      {/* Selector de Modo de Producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tarjeta de Producto Simple */}
        <button
          type="button"
          onClick={() => onVariantModeChange('simple')}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left group ${
            variantMode === 'simple'
              ? 'bg-red-50 border-trexx-red shadow-sm'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div
            className={`p-2.5 rounded-lg transition-colors ${
              variantMode === 'simple'
                ? 'bg-trexx-red text-white'
                : 'bg-gray-100 text-gray-400 group-hover:text-gray-700'
            }`}
          >
            <Package size={18} />
          </div>
          <div className="space-y-1">
            <p
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                variantMode === 'simple' ? 'text-trexx-red' : 'text-gray-800'
              }`}
            >
              Producto Simple (Único)
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Un solo inventario, precio base y SKU. Ideal para accesorios o artículos de edición exclusiva.
            </p>
          </div>
        </button>

        {/* Tarjeta de Producto Variable */}
        <button
          type="button"
          onClick={() => onVariantModeChange('variable')}
          className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left group ${
            variantMode === 'variable'
              ? 'bg-red-50 border-trexx-red shadow-sm'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div
            className={`p-2.5 rounded-lg transition-colors ${
              variantMode === 'variable'
                ? 'bg-trexx-red text-white'
                : 'bg-gray-100 text-gray-400 group-hover:text-gray-700'
            }`}
          >
            <Sparkles size={18} />
          </div>
          <div className="space-y-1">
            <p
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                variantMode === 'variable' ? 'text-trexx-red' : 'text-gray-800'
              }`}
            >
              Producto Variable (Múltiple)
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Combinaciones de diferentes atributos (ej: Color y Peso) con control de stock y SKU independientes.
            </p>
          </div>
        </button>
      </div>

      {attributeTypes.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No hay tipos de atributos configurados.</p>
      ) : (
        <div className="space-y-6 pt-4 border-t border-gray-100">
          {/* MODO PRODUCTO SIMPLE */}
          {variantMode === 'simple' && (
            <div className="space-y-4 max-w-[240px] animate-enter">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Stock Disponible
                </label>
                <p className="text-[11px] text-gray-500">
                  Ingresa las unidades físicas en stock.
                </p>
              </div>
              <input
                type="number"
                min={0}
                value={baseStock}
                onChange={(e) => onBaseStockChange(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 font-mono text-sm focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 focus:outline-none transition-all"
                placeholder="10"
              />
            </div>
          )}

          {/* MODO PRODUCTO VARIABLE */}
          {variantMode === 'variable' && (
            <div className="space-y-8 animate-enter">
              {/* Sección de Selección de Atributos */}
              <div className="space-y-6">
                {attributeTypes.map((type) => {
                  const values = type.attribute_values || []
                  if (values.length === 0) return null

                  return (
                    <div key={type.id} className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-trexx-red">
                        <Layers size={14} />
                        <span>Elegir opciones de {type.name}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {values.map((val) => {
                          const isSelected = selectedAttrValues.some((v) => v.id === val.id)

                          return (
                            <button
                              key={val.id}
                              type="button"
                              onClick={() =>
                                onToggleAttribute({
                                  id: val.id,
                                  value: val.value,
                                  typeId: type.id,
                                  typeName: type.name,
                                  typeSlug: type.slug,
                                })
                              }
                              className={`h-9 px-4 flex items-center justify-center text-xs font-bold rounded-lg border transition-all ${
                                isSelected
                                  ? 'bg-red-50 border-trexx-red text-trexx-red shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                              }`}
                            >
                              {val.value}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Tabla de Combinaciones de Variantes */}
              {generatedVariants.length > 0 ? (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900">
                      Combinaciones Generadas ({generatedVariants.length})
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Configura el SKU, precio adicional y stock de cada combinación.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                            <th className="p-3">Variante</th>
                            <th className="p-3">SKU</th>
                            <th className="p-3 w-32">Precio Adicional ($)</th>
                            <th className="p-3 w-28">Stock</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                        {generatedVariants.map((variant) => {
                          const label = variant.attributeValues.map((v) => v.value).join(' / ')

                          return (
                            <tr key={variant.key} className="hover:bg-gray-50 transition-colors">
                              <td className="p-3 font-bold text-gray-900 uppercase font-mono text-xs">{label}</td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={variant.sku}
                                  onChange={(e) => onUpdateVariant(variant.key, { sku: e.target.value })}
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 font-mono text-xs focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 focus:outline-none transition-all"
                                  placeholder="SKU"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={variant.priceModifier}
                                  onChange={(e) =>
                                    onUpdateVariant(variant.key, { priceModifier: parseFloat(e.target.value) || 0 })
                                  }
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 font-mono text-xs focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 focus:outline-none transition-all text-right"
                                  placeholder="0.00"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  min={0}
                                  value={variant.stock}
                                  onChange={(e) =>
                                    onUpdateVariant(variant.key, { stock: parseInt(e.target.value, 10) || 0 })
                                  }
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 font-mono text-xs focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 focus:outline-none transition-all text-right"
                                  placeholder="0"
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-xs text-gray-400 italic">
                    Selecciona uno o más atributos arriba para generar las combinaciones de variantes correspondientes.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
