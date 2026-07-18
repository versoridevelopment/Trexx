import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { StorageService } from '../storage/storage.service'

@Injectable()
export class ProductsService {
  constructor(
    private readonly repository: ProductsRepository,
    private readonly storageService: StorageService
  ) {}

  // Mapeador auxiliar para inyectar la propiedad `image` y las variaciones de color consolidadas
  private mapProduct(record: any) {
    if (!record) return record

    const list: any[] = []
    if (record.parent) {
      list.push(record.parent)
      if (record.parent.variations) {
        list.push(...record.parent.variations)
      }
    } else if (record.variations && record.variations.length > 0) {
      list.push(record)
      list.push(...record.variations)
    }

    const colorVariations = Array.from(new Map(list.map((p) => [p.id, p])).values())
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.product_images?.[0]?.url || null,
        color: p.color ? {
          id: p.color.id,
          name: p.color.name,
          hex_code: p.color.hex_code
        } : null
      }))
      .filter((v) => v.color !== null)

    return {
      ...record,
      image: record.product_images?.[0]?.url || null,
      color_variations: colorVariations,
    }
  }

  // Helper para normalizar el nombre y generar un slug único
  private async generateUniqueSlug(name: string): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
      .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres no alfanuméricos con guiones
      .replace(/(^-|-$)+/g, '') // Quitar guiones iniciales/finales

    let uniqueSlug = baseSlug
    let counter = 1
    while (await this.repository.slugExists(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`
      counter++
    }
    return uniqueSlug
  }

  // Helper para generar un SKU único — resuelve colisiones con sufijo numérico
  private async generateUniqueSku(baseSku: string): Promise<string> {
    let finalSku = baseSku
    let counter = 1
    while (await this.repository.skuExists(finalSku)) {
      finalSku = `${baseSku}-${counter}`
      counter++
    }
    return finalSku
  }

  // Endpoint público: solo productos activos
  public async findAll(categorySlug?: string) {
    const records = await this.repository.findAll(categorySlug)
    return records.map((r) => this.mapProduct(r))
  }

  // Endpoint público: lanza 404 si no existe o está inactivo
  public async findOne(id: number) {
    const record = await this.repository.findOne(id)
    if (!record || !record.is_active) {
      throw new NotFoundException(`Producto #${id} no encontrado`)
    }
    return this.mapProduct(record)
  }

  // Endpoint público para resolver por Slug (SEO)
  public async findOneBySlug(slug: string) {
    let record = await this.repository.findBySlug(slug)
    if (!record) {
      // Fallback: ver si el slug es en realidad un ID numérico
      const id = Number(slug)
      if (!isNaN(id)) {
        record = await this.repository.findOne(id)
      }
    }
    if (!record || !record.is_active) {
      throw new NotFoundException(`Producto "${slug}" no encontrado`)
    }
    return this.mapProduct(record)
  }

  // Admin: ve todos, activos e inactivos
  public async findAllAdmin(includeInactive = false) {
    const records = await this.repository.findAllAdmin(includeInactive)
    return records.map((r) => this.mapProduct(r))
  }

  // Admin: ve el producto aunque esté inactivo
  public async findOneAdmin(id: number) {
    const record = await this.repository.findOneAdmin(id)
    if (!record) throw new NotFoundException(`Producto #${id} no encontrado`)
    return this.mapProduct(record)
  }

  // Admin: lista todos los colores y auto-crea semillas si está vacío
  public async findAllColors() {
    let list = await this.repository.findAllColors()

    if (list.length === 0) {
      await this.repository.createManyColors([
        { name: 'Negro', hex_code: '#000000', display_order: 1 },
        { name: 'Blanco', hex_code: '#ffffff', display_order: 2 },
        { name: 'Volt', hex_code: '#ccff00', display_order: 3 },
        { name: 'Rojo', hex_code: '#ef4444', display_order: 4 },
        { name: 'Azul', hex_code: '#3b82f6', display_order: 5 },
        { name: 'Verde', hex_code: '#22c55e', display_order: 6 },
      ])
      list = await this.repository.findAllColors()
    }

    return list
  }

  public async create(input: {
    name?: string
    priceStr?: string
    categoryIdStr?: string
    description?: string
    parentIdStr?: string
    colorIdStr?: string
    slug?: string
    variantsStr?: string
    files?: { buffer: Buffer; filename: string; mimetype: string }[]
  }) {
    const { name, priceStr, categoryIdStr, description, parentIdStr, colorIdStr, slug, variantsStr, files } = input

    if (!name || !priceStr || !categoryIdStr) {
      throw new BadRequestException('Faltan campos obligatorios: name, price, category_id')
    }

    if (!files || files.length === 0) {
      throw new BadRequestException('Falta cargar al menos una imagen')
    }

    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Todos los archivos subidos deben ser imágenes')
      }
    }

    const price = Number(priceStr)
    const category_id = Number(categoryIdStr)
    const parent_id = parentIdStr ? Number(parentIdStr) : null
    const color_id = colorIdStr ? Number(colorIdStr) : null

    if (isNaN(price) || price <= 0) {
      throw new BadRequestException('El precio debe ser un número positivo')
    }
    if (isNaN(category_id)) {
      throw new BadRequestException('El ID de la categoría debe ser un número')
    }

    const categoryExists = await this.repository.categoryExists(category_id)
    if (!categoryExists) {
      throw new NotFoundException(`Categoría #${category_id} no encontrada o inactiva`)
    }

    // Validar jerarquía (solo 1 nivel)
    if (parent_id) {
      const parentRecord = await this.repository.findOneAdmin(parent_id)
      if (!parentRecord) {
        throw new NotFoundException(`Producto padre #${parent_id} no encontrado`)
      }
      if (parentRecord.parent_id) {
        throw new BadRequestException('Un producto hijo no puede ser seleccionado como padre. Solo se permite 1 nivel de jerarquía.')
      }
    }

    // Generar Slug único
    const productSlug = await this.generateUniqueSlug(slug || name)

    // Subir imágenes a Supabase Storage
    const uploadPromises = files.map(file => 
      this.storageService.uploadFile(
        file.buffer,
        file.filename,
        file.mimetype,
        'products'
      )
    )
    const imageUrls = await Promise.all(uploadPromises)

    // Parsear variantes y resolver SKUs únicos en el service (lógica de negocio)
    const rawVariants = variantsStr ? JSON.parse(variantsStr) : []
    const variants: any[] = []
    for (const v of rawVariants) {
      const baseSku = v.sku || `${productSlug.toUpperCase()}-VAR`
      const finalSku = await this.generateUniqueSku(baseSku)
      variants.push({ ...v, sku: finalSku })
    }

    // Ejecutar creación atómica delegada en el repositorio
    const createdProductId = await this.repository.createWithVariants(
      {
        name,
        price,
        category_id,
        description: description || null,
        parent_id: parent_id || null,
        color_id: color_id || null,
        slug: productSlug,
        product_images: {
          create: imageUrls.map((url, index) => ({
            url,
            is_primary: index === 0,
          })),
        },
      },
      variants
    )

    const created = await this.repository.findOneAdmin(createdProductId)
    return this.mapProduct(created)
  }

  public async update(
    id: number,
    input: {
      name?: string
      priceStr?: string
      categoryIdStr?: string
      description?: string
      parentIdStr?: string
      colorIdStr?: string
      slug?: string
      files?: { buffer: Buffer; filename: string; mimetype: string }[]
    }
  ) {
    // Verificar que el producto exista
    await this.findOneAdmin(id)

    const { name, priceStr, categoryIdStr, description, parentIdStr, colorIdStr, slug, files } = input
    const dataToUpdate: any = {}

    if (name !== undefined) {
      if (name.trim() === '') {
        throw new BadRequestException('El nombre del producto no puede estar vacío')
      }
      dataToUpdate.name = name
    }

    if (priceStr !== undefined) {
      const price = Number(priceStr)
      if (isNaN(price) || price <= 0) {
        throw new BadRequestException('El precio debe ser un número positivo')
      }
      dataToUpdate.price = price
    }

    if (categoryIdStr !== undefined) {
      const category_id = Number(categoryIdStr)
      if (isNaN(category_id)) {
        throw new BadRequestException('El ID de la categoría debe ser un número')
      }
      const categoryExists = await this.repository.categoryExists(category_id)
      if (!categoryExists) {
        throw new NotFoundException(`Categoría #${category_id} no encontrada o inactiva`)
      }
      dataToUpdate.category_id = category_id
    }

    if (description !== undefined) {
      dataToUpdate.description = description || null
    }

    // Validaciones de relación y jerarquía
    if (parentIdStr !== undefined) {
      const parent_id = parentIdStr ? Number(parentIdStr) : null
      if (parent_id) {
        if (parent_id === id) {
          throw new BadRequestException('Un producto no puede ser su propio padre')
        }
        const parentRecord = await this.repository.findOneAdmin(parent_id)
        if (!parentRecord) {
          throw new NotFoundException(`Producto padre #${parent_id} no encontrado`)
        }
        if (parentRecord.parent_id) {
          throw new BadRequestException('Un producto hijo no puede ser seleccionado como padre. Solo se permite 1 nivel de jerarquía.')
        }
      }
      dataToUpdate.parent_id = parent_id
    }

    if (colorIdStr !== undefined) {
      const color_id = colorIdStr ? Number(colorIdStr) : null
      dataToUpdate.color_id = color_id
    }

    if (slug !== undefined) {
      if (slug.trim() !== '') {
        const existing = await this.repository.findBySlug(slug)
        if (existing && existing.id !== id) {
          throw new BadRequestException('El slug ya está en uso por otro producto')
        }
        dataToUpdate.slug = slug
      }
    }

    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.mimetype.startsWith('image/')) {
          throw new BadRequestException('El archivo subido debe ser una imagen')
        }
      }
      const uploadPromises = files.map(file => 
        this.storageService.uploadFile(
          file.buffer,
          file.filename,
          file.mimetype,
          'products'
        )
      )
      const imageUrls = await Promise.all(uploadPromises)
      dataToUpdate.product_images = {
        deleteMany: {},
        create: imageUrls.map((url, index) => ({
          url,
          is_primary: index === 0,
        })),
      }
    }

    const updated = await this.repository.update(id, dataToUpdate)
    return this.mapProduct(updated)
  }

  // Borrado lógico
  public async remove(id: number) {
    await this.findOneAdmin(id)
    const record = await this.repository.updateActiveStatus(id, false)
    return this.mapProduct(record)
  }

  // Reactivar
  public async restore(id: number) {
    const record = await this.repository.findOneAdmin(id)
    if (!record) throw new NotFoundException(`Producto #${id} no encontrado`)
    if (record.is_active) throw new BadRequestException(`El producto #${id} ya está activo`)
    const restored = await this.repository.updateActiveStatus(id, true)
    return this.mapProduct(restored)
  }
}
