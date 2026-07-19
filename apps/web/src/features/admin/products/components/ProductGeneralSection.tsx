'use client'

interface Category {
  id: number
  name: string
}

interface ProductGeneralSectionProps {
  name: string
  setName: (val: string) => void
  price: string
  setPrice: (val: string) => void
  categoryId: string
  setCategoryId: (val: string) => void
  description: string
  setDescription: (val: string) => void
  slug: string
  setSlug: (val: string) => void
  categories: Category[]
}

const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-trexx-red focus:ring-1 focus:ring-trexx-red/20 transition-all"
const labelClass = "text-[11px] font-bold uppercase tracking-wider text-gray-500"

export function ProductGeneralSection({
  name,
  setName,
  price,
  setPrice,
  categoryId,
  setCategoryId,
  description,
  setDescription,
  slug,
  setSlug,
  categories,
}: ProductGeneralSectionProps) {
  return (
    <div className="space-y-6 pt-2">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-trexx-red">
          Información General
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelClass}>Nombre del Producto *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Ej: Pala Trexx Pro Carbon 2026"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelClass}>Precio Base ($) *</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${inputClass} font-mono`}
              placeholder="0.00"
              required
            />
            <p className="text-[10px] text-gray-400">
              Precio estándar al público.
            </p>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Categoría *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Slug (URL amigable)</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={`${inputClass} font-mono`}
          placeholder="ej: pala-trexx-pro-carbon-2026"
        />
        <p className="text-[10px] text-gray-400">
          Identificador amigable en la URL. Se genera automáticamente si lo dejás vacío.
        </p>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Descripción</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Detallá las características del producto..."
        />
      </div>
    </div>
  )
}
