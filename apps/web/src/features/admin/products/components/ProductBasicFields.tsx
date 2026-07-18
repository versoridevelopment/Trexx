'use client'

interface Category {
  id: number
  name: string
  slug: string
}

interface Color {
  id: number
  name: string
  hex_code: string | null
}

interface ParentProduct {
  id: number
  name: string
}

interface ProductBasicFieldsProps {
  name: string
  setName: (val: string) => void
  price: string
  setPrice: (val: string) => void
  categoryId: string
  setCategoryId: (val: string) => void
  description: string
  setDescription: (val: string) => void
  categories: Category[]
  colors: Color[]
  colorId: string
  setColorId: (val: string) => void
  parentProducts: ParentProduct[]
  parentId: string
  setParentId: (val: string) => void
  slug: string
  setSlug: (val: string) => void
}

export function ProductBasicFields({
  name,
  setName,
  price,
  setPrice,
  categoryId,
  setCategoryId,
  description,
  setDescription,
  categories,
  colors,
  colorId,
  setColorId,
  parentProducts,
  parentId,
  setParentId,
  slug,
  setSlug,
}: ProductBasicFieldsProps) {
  // Encontrar el color seleccionado para mostrar una vista previa
  const selectedColorObj = colors.find((c) => c.id.toString() === colorId)

  return (
    <div className="space-y-6 bg-[#09090b] border border-white/10 p-6 rounded-sm">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
          1. Información del Producto
        </h2>
        <p className="text-xs text-muted-foreground">
          Ingresa el título, precio, categoría y detalles del artículo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Nombre del Producto *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Pala Trexx Pro Carbon 2026"
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Precio ($) *
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej: 250.00"
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Categoría *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name} ({cat.slug})
              </option>
            ))}
          </select>
        </div>

        {/* Slug SEO */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Slug de URL (Opcional)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ej: pala-trexx-pro-carbon-2026"
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt font-mono"
          />
          <p className="text-[10px] text-muted-foreground">
            Dirección amigable para buscadores. Se genera automáticamente si se deja vacío.
          </p>
        </div>

        {/* Color Principal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-wider uppercase text-white">
              Color Principal (Opcional)
            </label>
            {selectedColorObj?.hex_code && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-mono">{selectedColorObj.hex_code}</span>
                <span
                  className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: selectedColorObj.hex_code }}
                />
              </div>
            )}
          </div>
          <select
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt"
          >
            <option value="">-- Sin color asignado --</option>
            {colors.map((col) => (
              <option key={col.id} value={col.id.toString()}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* Producto Padre (Relación de Modelo) */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Producto Padre (Vinculación de Modelo)
          </label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt"
          >
            <option value="">-- Este es el producto principal (Padre) --</option>
            {parentProducts.map((p) => (
              <option key={p.id} value={p.id.toString()}>
                {p.name} (ID: {p.id})
              </option>
            ))}
          </select>
          <p className="text-[10px] text-muted-foreground">
            Asócialo a un producto base para agruparlo como una variación de color en la tienda.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold tracking-wider uppercase text-white">
            Descripción
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalla las características de fabricación o tecnologías..."
            className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-trexx-volt resize-none"
          />
        </div>
      </div>
    </div>
  )
}
