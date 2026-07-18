export abstract class IProductVariantsRepository {
  abstract findByProduct(productId: number): Promise<any[]>;
  abstract findByProductAdmin(productId: number): Promise<any[]>;
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract findOneAdmin(id: number): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
  abstract updateActiveStatus(id: number, isActive: boolean): Promise<any>;
}
