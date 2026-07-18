export abstract class IOrderShippingsRepository {
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: number): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: number, data: any): Promise<any>;
  abstract remove(id: number): Promise<any>;
}
