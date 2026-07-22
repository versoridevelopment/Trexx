import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { IOrdersRepository } from '../orders.repository.interface';

@Injectable()
export class OrderOwnerOrAdminGuard implements CanActivate {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    if (!userId) {
      throw new ForbiddenException('No autorizado');
    }

    try {
      const orderId = BigInt(request.params.id);
      const isAllowed = await this.ordersRepository.isOwnerOrAdmin(
        orderId,
        userId,
      );
      if (!isAllowed) {
        throw new ForbiddenException('No tienes permiso para ver esta orden');
      }
      return true;
    } catch {
      throw new ForbiddenException(
        'No tienes permiso para ver esta orden o la orden no existe',
      );
    }
  }
}
