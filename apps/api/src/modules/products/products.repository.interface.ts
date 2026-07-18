export abstract class IProductsRepository {
  abstract findAll(categorySlug?: string): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract findBySlug(slug: string): Promise<any | null>;
  abstract findAllAdmin(includeInactive?: boolean): Promise<any[]>;
  abstract findOneAdmin(id: number): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract createWithVariants(productData: any, variants: any[]): Promise<number>;
  abstract skuExists(sku: string): Promise<boolean>;
  abstract categoryExists(id: number): Promise<boolean>;
  abstract slugExists(slug: string): Promise<boolean>;
  abstract findAllColors(): Promise<any[]>;
  abstract createManyColors(data: any[]): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
  abstract updateActiveStatus(id: number, isActive: boolean): Promise<any>;
}
