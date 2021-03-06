import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItem } from 'src/domains/models/order-item.model';
import { Product } from 'src/domains/models/product.model';

@Injectable()
export class ValidateItemQuantityUseCase {
  constructor() {}

  public async check(
    multiple: Product['multiple'],
    quantity: OrderItem['quantity'],
  ) {
    if (quantity % multiple !== 0)
      throw new BadRequestException(
        `A quantidade deve ser múltiplo de ${multiple}`,
      );
  }
}
