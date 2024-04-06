"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const orderDetails_entity_1 = require("./orderDetails.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderDetailsRepository, usersService, productsService, dataSource) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.usersService = usersService;
        this.productsService = productsService;
        this.dataSource = dataSource;
    }
    async findAll() {
        const orders = await this.ordersRepository.find({
            relations: ['user', 'orderDetail'],
        });
        return orders;
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderDetail', 'orderDetail.products'],
        });
        return order;
    }
    async create(order) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const user = await this.usersService.findOne(order.userId);
            const newOrder = this.ordersRepository.create({ user });
            const resultOrder = await queryRunner.manager.save(newOrder);
            let price = 0;
            const products = [];
            for await (const prodId of order.products) {
                const product = await this.productsService.findOne(prodId.id);
                if (product.stock < 1)
                    throw new common_1.ConflictException(`Opps. The product is currently out of stock: ${product.name}`);
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
            const resultNewOrderDetail = await queryRunner.manager.save(newOrderDetail);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return resultNewOrderDetail;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw err;
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        typeorm_2.DataSource])
], OrdersService);
//# sourceMappingURL=orders.service.js.map