import { Exclude } from 'class-transformer';
import { Orders } from 'src/entities/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
// TypeORM incorpora la generación de UUID
// import { v4 as uuid } from 'uuid';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // = uuid();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  // timestamptz -> asigna zona horaria
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

  // Relación 1:N con orders.
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Orders[];
}
