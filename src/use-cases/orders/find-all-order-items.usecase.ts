import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/core/models/order.model';
import { OrderItemRepository } from 'src/repositories/order-item.repository';

@Injectable()
export class FindAllOrderItemsUseCase {
  constructor(
    @Inject('OrderItemRepository')
    private readonly repository: OrderItemRepository,
  ) {}

  public async execute(id: Order['id']) {
    return await this.repository.getAllItems(id);
  }
}
