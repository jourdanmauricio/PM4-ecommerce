import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto } from './order.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetail } from './orderDetails.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
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
    return order;
  }

  async create(order: CreateOrderDto) {
    // Buscar user

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START
      const user = await this.usersService.findOne(order.userId);
      const newOrder = this.ordersRepository.create({ user });

      const resultOrder = await queryRunner.manager.save(newOrder);

      let price = 0;
      const products = [];
      // buscar productos
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

      const resultNewOrderDetail =
        await queryRunner.manager.save(newOrderDetail);

      await queryRunner.commitTransaction(); //COMMIT
      await queryRunner.release(); // RELEASE

      return resultNewOrderDetail;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }
}
