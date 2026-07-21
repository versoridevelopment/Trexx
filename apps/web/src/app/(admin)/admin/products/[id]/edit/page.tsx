import { productsService, categoriesService } from '@repo/api-client'
import { ProductEditForm } from '@/features/admin/products/components/ProductEditForm'
import { notFound } from 'next/navigation'

interface Category {
  id: number
  name: string
}

interface ProductEditPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = await params
  const productId = parseInt(id, 10)

  if (isNaN(productId)) {
    notFound()
  }

  const product = await productsService.getById(productId).catch(() => null)
  const categories = (await categoriesService.getAll().catch(() => [])) as Category[]

  if (!product) {
    notFound()
  }

  const normalizedProduct = {
    ...product,
    product_variants: (product.product_variants || []).map((variant: any) => ({
      ...variant,
      sku: typeof variant.sku === 'string' ? variant.sku : null,
      price_modifier: typeof variant.price_modifier === 'number' ? variant.price_modifier : null,
    })),
  }

  return (
    <div className="p-8">
      <ProductEditForm product={normalizedProduct} categories={categories} />
    </div>
  )
}
