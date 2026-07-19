'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
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
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft size={13} /> Volver a Productos
          </Link>
          <h1 className="text-2xl font-black uppercase text-gray-900 tracking-tight">
            Editar Producto <span className="text-trexx-red">#{product.id}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Modificá la información general, imágenes y el inventario de variantes.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-trexx-red text-white hover:bg-red-700 font-bold uppercase tracking-wider text-xs px-6 gap-2 shadow-sm"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
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

      {/* Sección 2: Gestión de Imágenes */}
      <ProductImagesSection
        currentImages={product.product_images}
        handleFileChange={handleFileChange}
        previews={previews}
      />

      {/* Sección 3: Variantes e Inventario */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="space-y-1">
          <h2 className="text-xs font-black uppercase tracking-[0.18em] text-trexx-red">
            Inventario y Variantes ({initialVariants.length})
          </h2>
          <p className="text-[11px] text-gray-500">
            💡 <span className="text-gray-800 font-semibold">Guardado por fila:</span> Modificá el Stock, SKU o precio de un talle y presioná{' '}
            <span className="text-trexx-red font-bold">Guardar</span> en esa fila para aplicar el cambio.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <ProductVariantsTable productId={product.id} initialVariants={initialVariants} />
        </div>
      </div>
    </div>
  )
}
