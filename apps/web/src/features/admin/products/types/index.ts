export interface AdminProduct {
  id: number
  name: string
  slug: string | null
  price: string | number
  is_active: boolean
  parent_id: number | null
  categories?: { name: string } | null
  product_images?: { url: string; is_primary: boolean }[] | null
  image?: string | null
}

export interface AdminProductVariantAttribute {
  attribute_values: {
    value: string
    attribute_types: { name: string }
  }
}

export interface AdminProductVariant {
  id: number
  sku: string | null
  stock: number
  price_modifier: number | null
  is_active: boolean | null
  variant_attributes: AdminProductVariantAttribute[]
}
