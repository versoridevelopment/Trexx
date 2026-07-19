'use client'

import { Upload } from 'lucide-react'

interface ProductImage {
  id: number
  url: string
  is_primary: boolean
}

interface ProductImagesSectionProps {
  currentImages?: ProductImage[] | null
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  previews: string[]
}

export function ProductImagesSection({
  currentImages,
  handleFileChange,
  previews,
}: ProductImagesSectionProps) {
  return (
    <div className="space-y-6 pt-2">
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-trexx-volt">
          Imágenes del Producto
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Imágenes actuales */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Fotos Actuales
          </p>
          {currentImages && currentImages.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {currentImages.map((img) => (
                <div
                  key={img.id}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a]"
                >
                  <img src={img.url} alt="Foto" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">Sin imágenes cargadas</p>
          )}
        </div>

        {/* Cargar Nuevas Fotos */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Subir Nuevas Fotos
          </p>
          <p className="text-[10px] text-muted-foreground mb-3">
            Al subir nuevas fotos, reemplazarán el catálogo actual al presionar "Guardar Cambios Generales".
          </p>
          <label className="flex flex-col items-center justify-center h-28 border border-dashed border-white/20 hover:border-trexx-volt rounded-lg cursor-pointer bg-[#0a0a0a] transition-all p-4 text-center group">
            <Upload size={20} className="text-muted-foreground group-hover:text-trexx-volt mb-1.5 transition-colors" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Seleccionar imágenes
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Previsualizaciones */}
          {previews.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-trexx-volt">
                Nuevas a reemplazar:
              </p>
              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-md overflow-hidden border border-trexx-volt bg-black"
                  >
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
