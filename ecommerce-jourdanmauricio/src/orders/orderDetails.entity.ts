import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  // order_id: Relación 1:1 con orders.
  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => Order, (order) => order.orderDetail, { nullable: true })
  order: Order;

  // Relación N:N con products.
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'order_details_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'product_id', // Relación con la otra entidad.
    },
  })
  products: Product[];
}
