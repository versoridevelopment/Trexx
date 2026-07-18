export abstract class IAddressesRepository {
  abstract findAll(userId?: string): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
  abstract updateActiveStatus(id: number, isActive: boolean): Promise<any>;
}
