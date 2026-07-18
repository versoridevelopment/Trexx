export abstract class IAttributeTypesRepository {
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract findAllAdmin(includeInactive?: boolean): Promise<any[]>;
  abstract findOneAdmin(id: number): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
  abstract updateActiveStatus(id: number, isActive: boolean): Promise<any>;
}
