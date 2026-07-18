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
    <div className="space-y-6 bg-[#09090b] border border-white/10 p-6 rounded-sm">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">
          2. Imágenes del Producto
        </h2>
        <p className="text-xs text-muted-foreground">
          Sube una o más fotos. La primera imagen seleccionada será la portada principal.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="relative border-2 border-dashed border-white/10 hover:border-trexx-volt/50 rounded-sm p-8 text-center bg-black/50 transition-colors cursor-pointer group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div className="space-y-2 pointer-events-none flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-trexx-volt group-hover:scale-110 transition-transform">
            <Upload size={22} />
          </div>
          <p className="text-xs font-bold text-white uppercase tracking-wider">
            Haz clic o arrastra imágenes aquí
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            PNG, JPG, WEBP, JPEG
          </p>
        </div>
      </div>

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-bold text-trexx-volt uppercase tracking-widest">
            Fotos seleccionadas ({previews.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {previews.map((src, index) => (
              <div key={index} className="relative group aspect-[3/4] bg-black border border-white/10 rounded-sm overflow-hidden">
                <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                
                {index === 0 && (
                  <span className="absolute top-1 left-1 bg-trexx-volt text-black font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-sm shadow-md">
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
