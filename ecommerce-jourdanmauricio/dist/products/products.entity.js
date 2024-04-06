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
exports.Product = void 0;
const class_transformer_1 = require("class-transformer");
const categories_entity_1 = require("../categories/categories.entity");
const orderDetails_entity_1 = require("../orders/orderDetails.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Product = class Product {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp',
    }),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.OrderDetail, (orderDetail) => orderDetail.products),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=products.entity.js.map