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
exports.Products = void 0;
const class_transformer_1 = require("class-transformer");
const categories_entity_1 = require("./categories.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
const typeorm_1 = require("typeorm");
let Products = class Products {
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp',
    }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.OrderDetails, (orderDetail) => orderDetail.products),
    __metadata("design:type", Array)
], Products.prototype, "orderDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)('products')
], Products);
//# sourceMappingURL=products.entity.js.map