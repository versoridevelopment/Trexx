export abstract class IUsersRepository {
  abstract findAll(includeInactive?: boolean): Promise<any[]>;
  abstract findByIdWithRoles(id: string): Promise<any | null>;
  abstract findOne(id: string): Promise<any | null>;
  abstract create(data: any): Promise<any>;
  abstract update(id: string, data: any): Promise<any>;
  abstract updateActiveStatus(id: string, isActive: boolean): Promise<any>;
  abstract findUserRole(userId: string, roleName: string): Promise<any | null>;
}
