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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("../products/products.entity");
let OrderDetail = class OrderDetail {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Order, (order) => order.orderDetail, { nullable: true }),
    __metadata("design:type", orders_entity_1.Order)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => products_entity_1.Product, (product) => product.orderDetails),
    (0, typeorm_1.JoinTable)({
        name: 'order_details_products',
        joinColumn: {
            name: 'order_details_id',
        },
        inverseJoinColumn: {
            name: 'product_id',
        },
    }),
    __metadata("design:type", Array)
], OrderDetail.prototype, "products", void 0);
exports.OrderDetail = OrderDetail = __decorate([
    (0, typeorm_1.Entity)('order_details')
], OrderDetail);
//# sourceMappingURL=orderDetails.entity.js.map