import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { CreateOrderDto } from './order.dto';
import { UsersService } from './../users/users.service';
import { ProductsService } from './../products/products.service';
import { OrderDetails } from '../entities/orderDetails.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    private usersService: UsersService,
    private productsService: ProductsService,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    const orders = await this.ordersRepository.find({
      relations: ['user', 'orderDetail'],
    });
    return orders;
  }

  async findOne(id: uuid) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetail', 'orderDetail.products'],
    });

    if (!order) throw new BadRequestException('Order not found');

    return order;
  }

  async create(order: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START
      const user = await this.usersService.findOne(order.userId);
      const newOrder = this.ordersRepository.create({ user });

      const resultOrder = await queryRunner.manager.save(newOrder);

      let price = 0;
      const products = [];
      for await (const prodId of order.products) {
        const product = await this.productsService.findOne(prodId.id);
        if (product.stock < 1)
          throw new ConflictException(
            `Opps. The product is currently out of stock: ${product.name}`,
          );
        price += Number(product.price);
        product.stock -= 1;

        const updProduct = await queryRunner.manager.save(product);
        products.push(updProduct);
      }

      const newOrderDetail = this.orderDetailsRepository.create({
        price,
        order: resultOrder,
        products,
      });

      await queryRunner.manager.save(newOrderDetail);

      await queryRunner.commitTransaction(); //COMMIT
      await queryRunner.release(); // RELEASE

      return await this.findOne(newOrder.id);
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }
}
