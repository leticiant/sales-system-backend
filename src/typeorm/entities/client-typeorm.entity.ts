import { Order } from 'src/domains/models/order.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderTypeorm } from './order-typeorm.entity';

@Entity({ name: 'clients' })
export class ClientTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => OrderTypeorm, (order) => order.client)
  orders: Order[];
}
