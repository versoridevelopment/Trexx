export abstract class IOrdersRepository {
  abstract findAll(): Promise<any[]>;
  abstract findAllAdmin(includeInactive?: boolean): Promise<any[]>;
  abstract findOne(id: bigint): Promise<any | null>;
  abstract findOneAdmin(id: bigint): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: bigint, data: any): Promise<any>;
  abstract updateActiveStatus(id: bigint, isActive: boolean): Promise<any>;
  abstract checkout(orderId: bigint, data: any): Promise<any>;
  abstract isOwnerOrAdmin(orderId: bigint, userId: string): Promise<boolean>;
}

