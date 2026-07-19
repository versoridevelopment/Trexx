'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { productsAdminService } from '@repo/api-client'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { ProductGeneralSection } from './ProductGeneralSection'
import { ProductImagesSection } from './ProductImagesSection'
import { ProductVariantsTable } from './ProductVariantsTable'
import { updateProductAction } from '../actions'
import type { AdminProductVariant } from '../types'

interface Category {
  id: number
  name: string
}

interface ProductEditFormProps {
  product: {
    id: number
    name: string
    price: number | string
    description?: string | null
    slug?: string | null
    category_id: number
    product_images?: { id: number; url: string; is_primary: boolean }[] | null
    product_variants?: AdminProductVariant[] | null
  }
  categories: Category[]
}

export function ProductEditForm({ product, categories }: ProductEditFormProps) {
  const router = useRouter()

  const [name, setName] = useState(product.name || '')
  const [price, setPrice] = useState(product.price?.toString() || '')
  const [categoryId, setCategoryId] = useState(product.category_id?.toString() || '1')
  const [description, setDescription] = useState(product.description || '')
  const [slug, setSlug] = useState(product.slug || '')

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files)
      setSelectedFiles(filesArr)

      const newPreviews = filesArr.map((file) => URL.createObjectURL(file))
      setPreviews(newPreviews)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('El nombre del producto es obligatorio')
      return
    }

    if (!price || Number(price) <= 0) {
      toast.error('El precio debe ser un número mayor a 0')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()

      if (!session?.access_token) {
        toast.error('Sesión expirada')
        return
      }

      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category_id', categoryId)
      if (description) formData.append('description', description)
      if (slug) formData.append('slug', slug)

      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })

      const res = await updateProductAction(product.id, formData)

      if (!res.success) {
        toast.error(res.error || 'Error al actualizar el producto')
        return
      }

      toast.success('Producto actualizado correctamente')
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Error al actualizar el producto')
    } finally {
      setLoading(false)
    }
  }

  const initialVariants = (product.product_variants || []).map((v: any) => ({
    ...v,
    sku: typeof v.sku === 'string' ? v.sku : null,
    price_modifier: typeof v.price_modifier === 'number' ? v.price_modifier : null,
  }))

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-enter">
      {/* Header Unificado con Explicación */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-muted-foreground hover:text-white transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Volver a Productos
          </Link>
          <h1 className="text-3xl font-black italic uppercase text-white tracking-tight">
            Edición Integral de Producto #{product.id}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Modificá la información general, catálogo de fotos y el inventario de talles desde un solo lugar.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold uppercase tracking-wider text-xs px-6"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : <CheckCircle2 size={16} className="mr-2" />}
          Guardar Cambios
        </Button>
      </div>

      {/* Sección 1: Información General */}
      <ProductGeneralSection
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        description={description}
        setDescription={setDescription}
        slug={slug}
        setSlug={setSlug}
        categories={categories}
      />

      {/* Sección 2: Gestión e Subida de Imágenes */}
      <ProductImagesSection
        currentImages={product.product_images}
        handleFileChange={handleFileChange}
        previews={previews}
      />

      {/* Sección 3: Gestión de Variantes de Stock / Talles */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-trexx-volt">
            Gestión de Inventario y Variantes ({initialVariants.length})
          </h2>
          <p className="text-[11px] text-muted-foreground">
            💡 <span className="text-white font-semibold">Guardado por fila:</span> Modificá el Stock, SKU o precio de un talle y presioná el botón <span className="text-trexx-volt font-bold">"Guardar"</span> que aparece en esa fila para aplicar el cambio inmediatamente sin recargar.
          </p>
        </div>

        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#070707]">
          <ProductVariantsTable productId={product.id} initialVariants={initialVariants} />
        </div>
      </div>
    </div>
  )
}
