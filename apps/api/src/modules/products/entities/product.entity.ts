import { ApiProperty } from '@nestjs/swagger'
import { Product as ProductInterface } from '@repo/types'

export class AttributeType {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Talle' })
  name: string

  @ApiProperty({ example: 'talle' })
  slug: string
}

export class AttributeValue {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'M' })
  value: string

  @ApiProperty({ type: () => AttributeType })
  attribute_types: AttributeType
}

export class VariantAttribute {
  @ApiProperty({ type: () => AttributeValue })
  attribute_values: AttributeValue
}

export class ProductVariant {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'SKU-001', nullable: true, type: () => String })
  sku: string | null

  @ApiProperty({ example: 0, nullable: true, type: () => Number })
  price_modifier: number | null

  @ApiProperty({ example: 10 })
  stock: number

  @ApiProperty({ example: true })
  is_active: boolean

  @ApiProperty({ type: () => [VariantAttribute] })
  variant_attributes: VariantAttribute[]
}

export class ProductCategory {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Remeras' })
  name: string

  @ApiProperty({ example: 'remeras' })
  slug: string
}

export class ProductImage {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 1 })
  product_id: number

  @ApiProperty({ example: 'https://example.com/image.png' })
  url: string

  @ApiProperty({ example: false })
  is_primary: boolean

  @ApiProperty({ example: '2026-04-10T00:00:00.000Z', nullable: true, type: () => String })
  created_at: Date | null
}

export class Product implements ProductInterface {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'Remera Técnica Elite' })
  name: string

  @ApiProperty({ example: 25.99 })
  price: number

  @ApiProperty({ example: 'Descripción del producto', nullable: true, type: () => String })
  description: string | null

  @ApiProperty({ example: 1 })
  category_id: number

  @ApiProperty({ example: '2026-04-10T00:00:00.000Z', nullable: true, type: () => String })
  created_at: Date | null

  @ApiProperty({ example: true })
  is_active: boolean

  @ApiProperty({ type: () => ProductCategory, nullable: true })
  categories?: ProductCategory | null

  @ApiProperty({ type: () => [ProductVariant] })
  product_variants?: ProductVariant[]

  @ApiProperty({ type: () => [ProductImage] })
  product_images: ProductImage[]
}

