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
    <div className="space-y-8 bg-[#09090b] border border-white/10 p-6 rounded-sm">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
          3. Stock e Inventario
        </h2>
        <p className="text-xs text-muted-foreground">
          Define si el producto tiene características únicas o si cuenta con múltiples variaciones de stock.
        </p>
      </div>

      {/* Selector de Modo de Producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tarjeta de Producto Simple */}
        <button
          type="button"
          onClick={() => onVariantModeChange('simple')}
          className={`flex items-start gap-4 p-4 rounded-sm border transition-all text-left group ${
            variantMode === 'simple'
              ? 'bg-trexx-volt/5 border-trexx-volt shadow-[0_0_15px_rgba(204,255,0,0.1)]'
              : 'bg-black border-white/10 hover:border-white/20'
          }`}
        >
          <div
            className={`p-3 rounded-sm transition-colors ${
              variantMode === 'simple'
                ? 'bg-trexx-volt text-black'
                : 'bg-white/5 text-muted-foreground group-hover:text-white'
            }`}
          >
            <Package size={20} />
          </div>
          <div className="space-y-1">
            <p
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                variantMode === 'simple' ? 'text-trexx-volt' : 'text-white'
              }`}
            >
              Producto Simple (Único)
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Un solo inventario, precio base y SKU. Ideal para accesorios o artículos de edición exclusiva.
            </p>
          </div>
        </button>

        {/* Tarjeta de Producto Variable */}
        <button
          type="button"
          onClick={() => onVariantModeChange('variable')}
          className={`flex items-start gap-4 p-4 rounded-sm border transition-all text-left group ${
            variantMode === 'variable'
              ? 'bg-trexx-volt/5 border-trexx-volt shadow-[0_0_15px_rgba(204,255,0,0.1)]'
              : 'bg-black border-white/10 hover:border-white/20'
          }`}
        >
          <div
            className={`p-3 rounded-sm transition-colors ${
              variantMode === 'variable'
                ? 'bg-trexx-volt text-black'
                : 'bg-white/5 text-muted-foreground group-hover:text-white'
            }`}
          >
            <Sparkles size={20} />
          </div>
          <div className="space-y-1">
            <p
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                variantMode === 'variable' ? 'text-trexx-volt' : 'text-white'
              }`}
            >
              Producto Variable (Múltiple)
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Combinaciones de diferentes atributos (ej: Color y Peso) con control de stock y SKU independientes.
            </p>
          </div>
        </button>
      </div>

      {attributeTypes.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No hay tipos de atributos configurados.</p>
      ) : (
        <div className="space-y-6 pt-4 border-t border-white/5">
          {/* MODO PRODUCTO SIMPLE */}
          {variantMode === 'simple' && (
            <div className="space-y-4 max-w-[240px] animate-enter">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-white">
                  Stock Disponible
                </label>
                <p className="text-[11px] text-muted-foreground">
                  Ingresa las unidades físicas en stock.
                </p>
              </div>
              <input
                type="number"
                min={0}
                value={baseStock}
                onChange={(e) => onBaseStockChange(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white font-mono focus:border-trexx-volt focus:outline-none"
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
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-trexx-volt">
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
                              className={`h-9 px-4 flex items-center justify-center text-xs font-bold rounded-sm border transition-all ${
                                isSelected
                                  ? 'bg-trexx-volt/10 border-trexx-volt text-trexx-volt shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                                  : 'bg-black border-white/10 text-muted-foreground hover:border-white/20 hover:text-white'
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
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-wider uppercase text-white">
                      Combinaciones Generadas ({generatedVariants.length})
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Configura el SKU, precio adicional y stock de cada combinación.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-white/10 rounded-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02] text-muted-foreground font-bold uppercase tracking-wider">
                          <th className="p-3">Variante</th>
                          <th className="p-3">SKU</th>
                          <th className="p-3 w-32">Precio Adicional ($)</th>
                          <th className="p-3 w-28">Stock</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-black">
                        {generatedVariants.map((variant) => {
                          const label = variant.attributeValues.map((v) => v.value).join(' / ')

                          return (
                            <tr key={variant.key} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-3 font-bold text-white uppercase font-mono">{label}</td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={variant.sku}
                                  onChange={(e) => onUpdateVariant(variant.key, { sku: e.target.value })}
                                  className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white font-mono focus:border-trexx-volt focus:outline-none"
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
                                  className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white font-mono focus:border-trexx-volt focus:outline-none text-right"
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
                                  className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white font-mono focus:border-trexx-volt focus:outline-none text-right"
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
                <div className="p-6 bg-white/[0.01] border border-white/5 rounded-sm text-center">
                  <p className="text-xs text-muted-foreground italic">
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
