import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from 'src/users/users.entity';
import { OrderDetail } from './orderDetails.entity';
import { Exclude } from 'class-transformer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // user_id: (Relación 1:N) con users.
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación 1:1 con orderDetails.
  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => OrderDetail, (detail) => detail.order, { nullable: true })
  @JoinColumn({ name: 'order_details_id' })
  orderDetail: OrderDetail;
}
