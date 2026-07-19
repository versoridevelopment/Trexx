import { productsService, categoriesService } from '@repo/api-client'
import { ProductEditForm } from '@/features/admin/products/components/ProductEditForm'
import { notFound } from 'next/navigation'

interface ProductEditPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = await params
  const productId = parseInt(id, 10)

  if (isNaN(productId)) {
    notFound()
  }

  const [product, categories] = await Promise.all([
    productsService.getById(productId).catch(() => null),
    categoriesService.getAll().catch(() => []),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <ProductEditForm product={product} categories={categories} />
    </div>
  )
}
