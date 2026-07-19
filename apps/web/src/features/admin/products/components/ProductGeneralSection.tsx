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
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-trexx-volt">
          Información General
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Nombre del Producto *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-trexx-volt transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Precio Base ($) *
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-trexx-volt transition-colors"
              required
            />
            <p className="text-[10px] text-muted-foreground">
              Precio estándar al público para todas las variantes.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Categoría *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-trexx-volt transition-colors"
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
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Slug (URL amigable)
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-trexx-volt transition-colors"
        />
        <p className="text-[10px] text-muted-foreground">
          Identificador amigable en la URL (ej: /shop/killshot-2-blanco). Se genera automáticamente si lo dejás vacío.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Descripción
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-trexx-volt resize-none transition-colors"
        />
      </div>
    </div>
  )
}
