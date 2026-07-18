import { Test, TestingModule } from '@nestjs/testing'
import { ProductsService } from './products.service'
import { IProductsRepository } from './products.repository.interface'
import { StorageService } from '../storage/storage.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('ProductsService', () => {
  let service: ProductsService
  let repository: IProductsRepository
  let storageService: StorageService

  const mockProductsRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findOneAdmin: jest.fn(),
    categoryExists: jest.fn(),
  }

  const mockStorageService = {
    uploadFile: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: IProductsRepository,
          useValue: mockProductsRepository,
        },
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
    repository = module.get<IProductsRepository>(IProductsRepository)
    storageService = module.get<StorageService>(StorageService)

    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should throw BadRequestException if name is missing', async () => {
      await expect(
        service.create({
          priceStr: '100',
          categoryIdStr: '2',
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequestException if files array is empty', async () => {
      await expect(
        service.create({
          name: 'Pala',
          priceStr: '100',
          categoryIdStr: '2',
          files: [],
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequestException if any file is not an image', async () => {
      await expect(
        service.create({
          name: 'Pala',
          priceStr: '100',
          categoryIdStr: '2',
          files: [
            {
              buffer: Buffer.from('test'),
              filename: 'doc.pdf',
              mimetype: 'application/pdf',
            },
          ],
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequestException if price is not positive', async () => {
      await expect(
        service.create({
          name: 'Pala',
          priceStr: '-10',
          categoryIdStr: '2',
          files: [
            {
              buffer: Buffer.from('test'),
              filename: 'img.png',
              mimetype: 'image/png',
            },
          ],
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw NotFoundException if category does not exist', async () => {
      mockProductsRepository.categoryExists.mockResolvedValue(false)

      await expect(
        service.create({
          name: 'Pala',
          priceStr: '100',
          categoryIdStr: '999',
          files: [
            {
              buffer: Buffer.from('test'),
              filename: 'img.png',
              mimetype: 'image/png',
            },
          ],
        })
      ).rejects.toThrow(NotFoundException)
    })

    it('should upload files and create product in repository', async () => {
      mockProductsRepository.categoryExists.mockResolvedValue(true)
      mockStorageService.uploadFile.mockResolvedValue('http://supabase.url/img.png')
      mockProductsRepository.create.mockResolvedValue({ id: 1, name: 'Pala' })

      const files = [
        {
          buffer: Buffer.from('test'),
          filename: 'img.png',
          mimetype: 'image/png',
        },
      ]

      const result = await service.create({
        name: 'Pala',
        priceStr: '100',
        categoryIdStr: '2',
        files,
      })

      expect(storageService.uploadFile).toHaveBeenCalledWith(
        files[0].buffer,
        files[0].filename,
        files[0].mimetype,
        'products'
      )
      expect(repository.create).toHaveBeenCalledWith({
        name: 'Pala',
        price: 100,
        category_id: 2,
        description: null,
        product_images: {
          create: [
            {
              url: 'http://supabase.url/img.png',
              is_primary: true,
            },
          ],
        },
      })
      expect(result).toEqual({ id: 1, name: 'Pala' })
    })
  })
})
