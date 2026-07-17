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

  // Endpoint público: solo productos activos
  public findAll(categorySlug?: string) {
    return this.repository.findAll(categorySlug)
  }

  // Endpoint público: lanza 404 si no existe o está inactivo
  public async findOne(id: number) {
    const record = await this.repository.findOne(id)
    if (!record || !record.is_active) {
      throw new NotFoundException(`Producto #${id} no encontrado`)
    }
    return record
  }

  // Admin: ve todos, activos e inactivos
  public findAllAdmin(includeInactive = false) {
    return this.repository.findAllAdmin(includeInactive)
  }

  // Admin: ve el producto aunque esté inactivo
  public async findOneAdmin(id: number) {
    const record = await this.repository.findOneAdmin(id)
    if (!record) throw new NotFoundException(`Producto #${id} no encontrado`)
    return record
  }

  public async create(input: {
    name?: string
    priceStr?: string
    categoryIdStr?: string
    description?: string
    files?: { buffer: Buffer; filename: string; mimetype: string }[]
  }) {
    const { name, priceStr, categoryIdStr, description, files } = input

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

    const uploadPromises = files.map(file => 
      this.storageService.uploadFile(
        file.buffer,
        file.filename,
        file.mimetype,
        'products'
      )
    )
    const imageUrls = await Promise.all(uploadPromises)

    const productData = {
      name,
      price,
      category_id,
      description: description || null,
      product_images: {
        create: imageUrls.map((url, index) => ({
          url,
          is_primary: index === 0,
        })),
      },
    }

    return this.repository.create(productData)
  }

  public async update(
    id: number,
    input: {
      name?: string
      priceStr?: string
      categoryIdStr?: string
      description?: string
      files?: { buffer: Buffer; filename: string; mimetype: string }[]
    }
  ) {
    // Verify product exists
    await this.findOneAdmin(id)

    const { name, priceStr, categoryIdStr, description, files } = input
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

    return this.repository.update(id, dataToUpdate)
  }

  // Borrado lógico
  public async remove(id: number) {
    await this.findOneAdmin(id)
    return this.repository.updateActiveStatus(id, false)
  }

  // Reactivar
  public async restore(id: number) {
    const record = await this.repository.findOneAdmin(id)
    if (!record) throw new NotFoundException(`Producto #${id} no encontrado`)
    if (record.is_active) throw new BadRequestException(`El producto #${id} ya está activo`)
    return this.repository.updateActiveStatus(id, true)
  }
}
