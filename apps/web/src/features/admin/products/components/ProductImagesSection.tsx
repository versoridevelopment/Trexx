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
    <div className="space-y-6 pt-2 border-t border-gray-200">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-trexx-red">
          Imágenes del Producto
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Imágenes actuales */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
            Fotos Actuales
          </p>
          {currentImages && currentImages.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {currentImages.map((img) => (
                <div
                  key={img.id}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <img src={img.url} alt="Foto" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Sin imágenes cargadas</p>
          )}
        </div>

        {/* Subir Nuevas Fotos */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            Subir Nuevas Fotos
          </p>
          <p className="text-[10px] text-gray-400 mb-3">
            Al subir nuevas fotos, reemplazarán el catálogo actual al presionar "Guardar".
          </p>
          <label className="flex flex-col items-center justify-center h-28 border border-dashed border-gray-300 hover:border-trexx-red rounded-xl cursor-pointer bg-gray-50 hover:bg-red-50/50 transition-all p-4 text-center group">
            <Upload size={20} className="text-gray-300 group-hover:text-trexx-red mb-1.5 transition-colors" />
            <span className="text-[11px] font-bold text-gray-500 group-hover:text-trexx-red uppercase tracking-wider transition-colors">
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
              <p className="text-[10px] font-bold uppercase tracking-wider text-trexx-red">
                Nuevas a reemplazar:
              </p>
              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg overflow-hidden border-2 border-trexx-red bg-gray-50"
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
