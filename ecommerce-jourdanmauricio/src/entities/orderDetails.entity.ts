import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from 'src/entities/products.entity';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  // order_id: Relación 1:1 con orders.
  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  // Relación N:N con products.
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'order_details_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'product_id', // Relación con la otra entidad.
    },
  })
  products: Products[];
}
