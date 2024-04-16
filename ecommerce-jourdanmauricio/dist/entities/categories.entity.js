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
exports.Categories = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const products_entity_1 = require("./products.entity");
const typeorm_1 = require("typeorm");
let Categories = class Categories {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, products: { required: true, type: () => [require("./products.entity").Products] } };
    }
};
exports.Categories = Categories;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Categories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Categories.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Categories.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_entity_1.Products, (product) => product.category),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Categories.prototype, "products", void 0);
exports.Categories = Categories = __decorate([
    (0, typeorm_1.Entity)('categories')
], Categories);
//# sourceMappingURL=categories.entity.js.map