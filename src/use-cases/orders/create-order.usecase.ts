import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from 'src/core/models/order-item.model';
import { Order } from 'src/core/models/order.model';
import { OrderRepository } from 'src/core/repositories/order.repository';
import { ProductRepository } from 'src/core/repositories/product.repository';
import { CreateOrderDto } from 'src/typeorm/dtos/orders/create-order.dto';
import { ValidateItemUseCase } from '../items/validate-item.usecase';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderRepository') private readonly repository: OrderRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private validateItemUseCase: ValidateItemUseCase,
  ) {}

  public async execute(createOrderDto: CreateOrderDto) {
    const items = createOrderDto.items.map(
      (item) =>
        new OrderItem({
          product: item.product,
          price: item.price,
          quantity: item.quantity,
        }),
    );

    const order = new Order({
      client: createOrderDto.client,
      items,
    });

    for (const item of order.items) {
      const product = await this.productRepository.getProductById(
        item.product.id,
      );
      this.validateItemUseCase.execute({ ...item, product });
    }

    const resultOrder = await this.repository.addOrder(order);

    return resultOrder;
  }
}
