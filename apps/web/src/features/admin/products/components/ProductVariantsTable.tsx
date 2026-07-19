'use client'

import { useState } from 'react'
import { createClient } from '@/shared/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, Save, Trash2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateProductVariantAction, toggleVariantActiveAction } from '../actions'
import type { AdminProductVariant } from '../types'

interface VariantRowProps {
  variant: AdminProductVariant
  onUpdate: (id: number, sku: string, stock: number, priceModifier: number) => Promise<void>
  onToggleActive: (id: number, isActive: boolean) => Promise<void>
}

function VariantRow({ variant, onUpdate, onToggleActive }: VariantRowProps) {
  const [sku, setSku] = useState(variant.sku || '')
  const [stock, setStock] = useState(variant.stock)
  const [priceModifier, setPriceModifier] = useState(Number(variant.price_modifier || 0))
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState(false)

  const label = variant.variant_attributes
    .map((va) => `${va.attribute_values.attribute_types.name}: ${va.attribute_values.value}`)
    .join(' / ') || 'Sin atributos (Único)'

  const isDirty =
    sku !== (variant.sku || '') ||
    stock !== variant.stock ||
    priceModifier !== Number(variant.price_modifier || 0)

  const handleSave = async () => {
    if (!isDirty) return
    setSaving(true)
    try {
      await onUpdate(variant.id, sku, stock, priceModifier)
      toast.success(`Variante "${label}" actualizada`)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async () => {
    setToggling(true)
    try {
      await onToggleActive(variant.id, Boolean(variant.is_active))
      toast.success(variant.is_active ? `Variante desactivada` : `Variante reactivada`)
    } finally {
      setToggling(false)
    }
  }

  return (
    <tr className={`border-b border-white/5 text-xs transition-colors ${variant.is_active ? '' : 'opacity-40'}`}>
      <td className="py-3 px-4 font-bold text-white text-sm">{label}</td>

      <td className="py-3 px-4">
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          disabled={!variant.is_active}
          className="w-full bg-black border border-white/10 rounded-sm px-3 py-1.5 text-[11px] text-white font-mono focus:outline-none focus:border-trexx-volt disabled:opacity-40"
        />
      </td>

      <td className="py-3 px-4">
        <input
          type="number"
          value={stock}
          min={0}
          onChange={(e) => setStock(Number(e.target.value))}
          disabled={!variant.is_active}
          className="w-20 bg-black border border-white/10 rounded-sm px-3 py-1.5 text-[11px] text-white font-mono text-center focus:outline-none focus:border-trexx-volt disabled:opacity-40"
        />
      </td>

      <td className="py-3 px-4">
        <input
          type="number"
          step="0.01"
          value={priceModifier}
          onChange={(e) => setPriceModifier(Number(e.target.value))}
          disabled={!variant.is_active}
          className="w-24 bg-black border border-white/10 rounded-sm px-3 py-1.5 text-[11px] text-white font-mono text-center focus:outline-none focus:border-trexx-volt disabled:opacity-40"
        />
      </td>

      <td className="py-3 px-4">
        <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-sm border ${
          variant.is_active
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        }`}>
          {variant.is_active ? 'Activa' : 'Baja'}
        </span>
      </td>

      <td className="py-3 px-4 text-right space-x-2">
        {isDirty && variant.is_active && (
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="h-7 px-3 bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold text-[10px] uppercase tracking-wider gap-1"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            Guardar
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleToggle}
          disabled={toggling}
          title={variant.is_active ? 'Dar de baja' : 'Reactivar'}
          className={`h-7 w-7 p-0 ${variant.is_active ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'}`}
        >
          {toggling
            ? <Loader2 size={12} className="animate-spin" />
            : variant.is_active
              ? <Trash2 size={12} />
              : <RotateCcw size={12} />
          }
        </Button>
      </td>
    </tr>
  )
}

interface ProductVariantsTableProps {
  productId: number
  initialVariants: AdminProductVariant[]
}

export function ProductVariantsTable({ productId, initialVariants }: ProductVariantsTableProps) {
  const [variants, setVariants] = useState<AdminProductVariant[]>(initialVariants)

  const handleUpdate = async (id: number, sku: string, stock: number, priceModifier: number) => {
    const res = await updateProductVariantAction(id, { sku, stock, price_modifier: priceModifier })
    if (!res.success) {
      toast.error(res.error || 'Error al actualizar la variante')
      return
    }

    setVariants((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              sku,
              stock,
              price_modifier: priceModifier,
            }
          : v
      )
    )
  }

  const handleToggleActive = async (id: number, currentActive: boolean) => {
    const res = await toggleVariantActiveAction(id, currentActive)
    if (!res.success) {
      toast.error(res.error || 'Error al cambiar el estado de la variante')
      return
    }

    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, is_active: !currentActive } : v))
    )
  }

  if (variants.length === 0) {
    return (
      <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider py-6 text-center">
        Este producto no tiene variantes registradas.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            <th className="py-3 px-4">Atributos</th>
            <th className="py-3 px-4">SKU</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Mod. Precio ($)</th>
            <th className="py-3 px-4">Estado</th>
            <th className="py-3 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <VariantRow
              key={v.id}
              variant={v}
              onUpdate={handleUpdate}
              onToggleActive={handleToggleActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
