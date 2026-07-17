import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { parseMultipartRequest } from '../../common/utils/multipart'
import { FastifyRequest } from 'fastify'
import { PrismaService } from '../../prisma/prisma.service'
import { Reflector } from '@nestjs/core'
import { RolesGuard } from '../auth/guards/roles.guard'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard'

jest.mock('../../common/utils/multipart', () => ({
  parseMultipartRequest: jest.fn(),
}))

describe('ProductsController', () => {
  let controller: ProductsController
  let service: ProductsService

  const mockProductsService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findAllAdmin: jest.fn(),
    findOneAdmin: jest.fn(),
    remove: jest.fn(),
    restore: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: Reflector,
          useValue: {},
        },
      ],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get<ProductsController>(ProductsController)
    service = module.get<ProductsService>(ProductsService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should parse multipart request and call service.create', async () => {
      const mockReq = {} as FastifyRequest
      const mockFields = {
        name: 'Producto Test',
        price: '100',
        category_id: '2',
        description: 'Descripción test',
      }
      const mockFiles = [
        {
          buffer: Buffer.from('test'),
          filename: 'image.png',
          mimetype: 'image/png',
        },
      ]

      ;(parseMultipartRequest as jest.Mock).mockResolvedValue({
        fields: mockFields,
        files: mockFiles,
      })

      mockProductsService.create.mockResolvedValue({ id: 1, ...mockFields })

      const result = await controller.create(mockReq)

      expect(parseMultipartRequest).toHaveBeenCalledWith(mockReq)
      expect(service.create).toHaveBeenCalledWith({
        name: 'Producto Test',
        priceStr: '100',
        categoryIdStr: '2',
        description: 'Descripción test',
        files: mockFiles,
      })
      expect(result).toEqual({ id: 1, ...mockFields })
    })
  })

  describe('update', () => {
    it('should parse multipart request and call service.update', async () => {
      const mockReq = {} as FastifyRequest
      const mockFields = {
        name: 'Producto Editado',
        price: '150',
      }
      const mockFiles = [
        {
          buffer: Buffer.from('test-edit'),
          filename: 'image-edit.png',
          mimetype: 'image/png',
        },
      ]

      ;(parseMultipartRequest as jest.Mock).mockResolvedValue({
        fields: mockFields,
        files: mockFiles,
      })

      mockProductsService.update.mockResolvedValue({ id: 1, ...mockFields })

      const result = await controller.update(1, mockReq)

      expect(parseMultipartRequest).toHaveBeenCalledWith(mockReq)
      expect(service.update).toHaveBeenCalledWith(1, {
        name: 'Producto Editado',
        priceStr: '150',
        categoryIdStr: undefined,
        description: undefined,
        files: mockFiles,
      })
      expect(result).toEqual({ id: 1, ...mockFields })
    })
  })
})
