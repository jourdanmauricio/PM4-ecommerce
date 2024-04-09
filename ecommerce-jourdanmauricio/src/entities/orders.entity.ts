import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Users } from 'src/entities/users.entity';
import { OrderDetails } from './orderDetails.entity';
import { Exclude } from 'class-transformer';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // = uuid();

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // user_id: (Relación 1:N) con users.
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // Relación 1:1 con orderDetails.
  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetails;
}
