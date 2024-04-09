import { Exclude } from 'class-transformer';
import { Products } from 'src/entities/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
//import { v4 as uuid } from 'uuid';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // = uuid();

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

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

  // Relación N:1 con productos
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
