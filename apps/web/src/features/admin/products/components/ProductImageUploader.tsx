import { Upload, X } from 'lucide-react'

interface ProductImageUploaderProps {
  previews: string[]
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

export function ProductImageUploader({
  previews,
  onFileChange,
  onRemoveFile,
}: ProductImageUploaderProps) {
  return (
    <div className="space-y-6 pt-4 border-t border-gray-200">
      <div className="space-y-1 border-b border-gray-200 pb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-trexx-red">
          2. Imágenes del Producto
        </h2>
        <p className="text-xs text-muted-foreground">
          Sube una o más fotos. La primera imagen seleccionada será la portada principal.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="relative border-2 border-dashed border-gray-200 hover:border-trexx-red rounded-xl p-8 text-center bg-gray-50 hover:bg-red-50/30 transition-colors cursor-pointer group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div className="space-y-2 pointer-events-none flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-red-100 flex items-center justify-center text-gray-400 group-hover:text-trexx-red transition-colors">
            <Upload size={22} />
          </div>
          <p className="text-xs font-bold text-gray-600 group-hover:text-trexx-red uppercase tracking-wider transition-colors">
            Haz clic o arrastra imágenes aquí
          </p>
          <p className="text-[10px] text-gray-400 font-mono">
            PNG, JPG, WEBP, JPEG
          </p>
        </div>
      </div>

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-bold text-trexx-red uppercase tracking-widest">
            Fotos seleccionadas ({previews.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {previews.map((src, index) => (
              <div key={index} className="relative group aspect-[3/4] bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                
                {index === 0 && (
                  <span className="absolute top-1 left-1 bg-trexx-red text-white font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-sm shadow-md">
                    Portada
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="absolute top-1 right-1 bg-rose-500/80 hover:bg-rose-600 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
