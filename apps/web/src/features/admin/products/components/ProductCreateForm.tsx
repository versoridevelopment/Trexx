'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { productsAdminService, attributeTypesService } from '@repo/api-client'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { ProductBasicFields } from './ProductBasicFields'
import { ProductImageUploader } from './ProductImageUploader'
import {
  ProductVariantSelector,
  type SelectedAttrValue,
  type GeneratedVariantEntry,
} from './ProductVariantSelector'

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

interface ProductCreateFormProps {
  categories: Category[]
}

function generateCombinations(groups: SelectedAttrValue[][]): SelectedAttrValue[][] {
  if (groups.length === 0) return []
  const activeGroups = groups.filter((g) => g.length > 0)
  if (activeGroups.length === 0) return []

  let results: SelectedAttrValue[][] = [[]]
  for (const group of activeGroups) {
    const nextResults: SelectedAttrValue[][] = []
    for (const r of results) {
      for (const item of group) {
        nextResults.push([...r, item])
      }
    }
    results = nextResults
  }
  return results
}

export function ProductCreateForm({ categories }: ProductCreateFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const duplicateFromId = searchParams.get('duplicate_from')

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id?.toString() || '1')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [parentId, setParentId] = useState('')
  const [colorId, setColorId] = useState('')

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const [attributeTypes, setAttributeTypes] = useState<any[]>([])
  const [selectedAttrValues, setSelectedAttrValues] = useState<SelectedAttrValue[]>([])
  const [generatedVariants, setGeneratedVariants] = useState<GeneratedVariantEntry[]>([])
  const [baseStock, setBaseStock] = useState(10)
  const [variantMode, setVariantMode] = useState<'simple' | 'variable'>('simple')

  const [colors, setColors] = useState<Color[]>([])
  const [parentProducts, setParentProducts] = useState<ParentProduct[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch Metadata (Colors, Attribute Types, Parent Products) on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const supabase = createClient()
        const { data: { session } } = await (supabase.auth as any).getSession()
        if (!session) return

        // 1. Fetch active colors
        const colorsData = await productsAdminService.getColors(session.access_token)
        setColors(colorsData)

        // 2. Fetch attribute types
        const attrData = await attributeTypesService.getAll()
        const filteredAttrData = attrData.filter((a: any) => a.slug !== 'color')
        setAttributeTypes(filteredAttrData)

        // 3. Fetch products to select parent (only parent_id = null)
        const productsData = await productsAdminService.getAllProducts(session.access_token)
        const parents = productsData.filter(
          (p: any) => p.parent_id === null || p.parent_id === undefined
        )
        setParentProducts(parents)

        // 4. Handle duplication if duplicate_from parameter is present
        if (duplicateFromId) {
          const source = await productsAdminService.getProductById(Number(duplicateFromId), session.access_token) as any

          setName(source.name)
          setPrice(source.price?.toString() || '')
          setCategoryId(source.category_id?.toString() || '1')
          setDescription(source.description || '')
          // Si el clonado ya es hijo, heredamos su parent_id. Si es padre, lo asignamos como padre.
          const targetParentId = source.parent_id || source.id
          setParentId(targetParentId.toString())

          // Copiar los atributos marcados en el original
          if (source.product_variants && source.product_variants.length > 0) {
            const copiedValues: SelectedAttrValue[] = []
            source.product_variants.forEach((v: any) => {
              v.variant_attributes.forEach((va: any) => {
                const val = va.attribute_values
                const type = val.attribute_types
                // Excluir color de los atributos copiados
                if (type.slug !== 'color') {
                  const isAlreadyCopied = copiedValues.some((cv) => cv.id === val.id)
                  if (!isAlreadyCopied) {
                    copiedValues.push({
                      id: val.id,
                      value: val.value,
                      typeId: type.id,
                      typeName: type.name,
                      typeSlug: type.slug,
                    })
                  }
                }
              })
            })

            if (copiedValues.length > 0) {
              setVariantMode('variable')
              setSelectedAttrValues(copiedValues)
            }
          }

          toast.success('Información básica y variantes del producto base precargadas.')
        }
      } catch (e) {
        console.error('Error fetching admin metadata:', e)
      }
    }

    fetchMetadata()
  }, [duplicateFromId])

  // Recalculate combinations when selected attributes change
  useEffect(() => {
    if (variantMode === 'simple') {
      setGeneratedVariants([])
      return
    }

    // Group by typeId
    const groups: Record<number, SelectedAttrValue[]> = {}
    selectedAttrValues.forEach((val) => {
      if (!groups[val.typeId]) groups[val.typeId] = []
      groups[val.typeId].push(val)
    })

    const groupArrays = Object.values(groups)
    const combinations = generateCombinations(groupArrays)

    setGeneratedVariants((prev) => {
      return combinations.map((combo) => {
        const comboKey = combo
          .map((c) => c.id)
          .sort((a, b) => a - b)
          .join('-')
        const existing = prev.find((p) => p.key === comboKey)

        const sanitizedProductName = name.toUpperCase().replace(/[^A-Z0-9]/g, '-')
        const comboSuffix = combo
          .map((c) => c.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))
          .join('-')
        const defaultSku = `${sanitizedProductName || 'PALA'}-${comboSuffix || 'VAR'}`

        return {
          key: comboKey,
          attributeValues: combo,
          sku: existing?.sku || defaultSku,
          stock: existing?.stock !== undefined ? existing.stock : 10,
          priceModifier: existing?.priceModifier !== undefined ? existing.priceModifier : 0,
        }
      })
    })
  }, [selectedAttrValues, name, variantMode])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...filesArray])
    const newPreviews = filesArray.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    URL.revokeObjectURL(previews[index])
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleToggleAttribute = (val: SelectedAttrValue) => {
    setSelectedAttrValues((prev) => {
      const exists = prev.some((item) => item.id === val.id)
      if (exists) {
        return prev.filter((item) => item.id !== val.id)
      } else {
        return [...prev, val]
      }
    })
  }

  const handleUpdateVariant = (key: string, fields: Partial<GeneratedVariantEntry>) => {
    setGeneratedVariants((prev) =>
      prev.map((v) => (v.key === key ? { ...v, ...fields } : v))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || !categoryId) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    if (selectedFiles.length === 0) {
      toast.error('Debes seleccionar al menos una imagen para el producto')
      return
    }

    if (variantMode === 'variable' && generatedVariants.length === 0) {
      toast.error('Por favor selecciona al menos una opción de atributo en el modo Variable')
      return
    }

    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { session } } = await (supabase.auth as any).getSession()

      if (!session) {
        toast.error('Sesión no encontrada. Por favor inicia sesión nuevamente.')
        router.push('/login')
        return
      }

      // 1. Prepare Form Data
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category_id', categoryId)
      formData.append('description', description)
      if (slug.trim()) formData.append('slug', slug.trim())
      if (parentId) formData.append('parent_id', parentId)
      if (colorId) formData.append('color_id', colorId)

      // Serialize variants
      let submissionVariants = []
      if (variantMode === 'simple') {
        submissionVariants = [
          {
            sku: `${name.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-DEFAULT`,
            stock: baseStock,
            priceModifier: 0,
            attributeValues: [],
          },
        ]
      } else {
        submissionVariants = generatedVariants.map((gv) => ({
          sku: gv.sku,
          stock: gv.stock,
          priceModifier: gv.priceModifier,
          attributeValues: gv.attributeValues.map((av) => ({ id: av.id })),
        }))
      }
      formData.append('variants', JSON.stringify(submissionVariants))

      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })

      // 2. Submit everything in ONE atomic request
      await productsAdminService.create(formData, session.access_token)

      toast.success('¡Producto y variantes creados de forma atómica y exitosa!')
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      console.error('Create product error:', err)
      toast.error(err.message || 'Ocurrió un error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* 1. Basic Info Section */}
      <ProductBasicFields
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        description={description}
        setDescription={setDescription}
        categories={categories}
        colors={colors}
        colorId={colorId}
        setColorId={setColorId}
        parentProducts={parentProducts}
        parentId={parentId}
        setParentId={setParentId}
        slug={slug}
        setSlug={setSlug}
      />

      {/* 2. Images Section */}
      <ProductImageUploader
        previews={previews}
        onFileChange={handleFileChange}
        onRemoveFile={handleRemoveFile}
      />

      {/* 3. Variants & Stock Section */}
      <ProductVariantSelector
        attributeTypes={attributeTypes}
        selectedAttrValues={selectedAttrValues}
        onToggleAttribute={handleToggleAttribute}
        generatedVariants={generatedVariants}
        onUpdateVariant={handleUpdateVariant}
        baseStock={baseStock}
        onBaseStockChange={setBaseStock}
        variantMode={variantMode}
        onVariantModeChange={setVariantMode}
      />

      {/* Submit Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/products')}
          className="border-white/10 text-muted-foreground hover:text-white uppercase font-bold text-xs"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-trexx-volt text-black hover:bg-trexx-volt/90 font-bold uppercase tracking-wider text-xs px-8 gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Guardando Producto...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Guardar y Publicar</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
