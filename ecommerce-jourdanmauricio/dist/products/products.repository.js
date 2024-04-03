"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
let ProductsRepository = class ProductsRepository {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description 1',
                price: 10,
                stock: true,
                imgUrl: 'https://image1.com',
            },
            {
                id: 2,
                name: 'Product 2',
                description: 'Description 2',
                price: 20,
                stock: true,
                imgUrl: 'https://image2.com',
            },
            {
                id: 3,
                name: 'Product 3',
                description: 'Description 3',
                price: 30,
                stock: true,
                imgUrl: 'https://image3.com',
            },
            {
                id: 4,
                name: 'Product 4',
                description: 'Description 4',
                price: 30,
                stock: true,
                imgUrl: 'https://image3.com',
            },
            {
                id: 5,
                name: 'Product 5',
                description: 'Description 5',
                price: 30,
                stock: true,
                imgUrl: 'https://image3.com',
            },
        ];
    }
    async getProducts(params) {
        const { limit = 5, page = 1 } = params;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const products = this.products.slice(startIndex, endIndex);
        return { page, products };
    }
    async getById(id) {
        const user = this.products.find((user) => user.id === id);
        if (!user)
            throw new common_1.NotFoundException('Product not found');
        return user;
    }
    async createProduct(product) {
        const id = this.products.length + 1;
        this.products = [...this.products, { id, ...product }];
        return { id, ...product };
    }
    async updateProduct(id, changes) {
        const product = await this.getById(id);
        if (product) {
            const index = this.products.findIndex((item) => item.id === id);
            this.products[index] = {
                ...product,
                ...changes,
            };
            return this.products[index];
        }
        return null;
    }
    async deleteProduct(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('Product not found');
        this.products.splice(index, 1);
        return { id };
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)()
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map