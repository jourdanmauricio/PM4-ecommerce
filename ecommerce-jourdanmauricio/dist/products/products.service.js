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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const initialData = require("./../data/initialData.json");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./products.entity");
const categories_entity_1 = require("../categories/categories.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        const [products, total] = await this.productsRepository.findAndCount({
            skip: skip,
            take: limit,
        });
        return { page, total, products };
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async create(product) {
        const category = await this.categoriesRepository.findOneBy({
            id: product.categoryId,
        });
        if (!category)
            throw new common_1.BadRequestException('Category not found');
        const newProduct = this.productsRepository.create(product);
        newProduct.category = category;
        const result = await this.productsRepository
            .save(newProduct)
            .catch((err) => {
            throw new common_1.BadRequestException(err.detail);
        });
        return result;
    }
    async update(id, changes) {
        const product = await this.findOne(id);
        this.productsRepository.merge(product, changes);
        return this.productsRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productsRepository.delete(id);
        return product;
    }
    async preLoadProducts() {
        const prodCreated = [];
        const prodFound = [];
        const prodError = [];
        for await (const product of initialData) {
            const found = await this.productsRepository.findOneBy({
                name: product.name,
            });
            if (!found) {
                const category = await this.categoriesRepository.findOneBy({
                    name: product.category,
                });
                if (!category) {
                    prodError.push({
                        product: product.name,
                        error: `Category not found: ${product.category}`,
                    });
                }
                else {
                    const newProd = {
                        ...product,
                        categoryId: category.id,
                    };
                    delete newProd.category;
                    const newProduct = await this.create(newProd);
                    prodCreated.push({ id: newProduct.id, name: newProduct.name });
                }
            }
            else {
                prodFound.push({ id: found.id, name: found.name });
            }
        }
        return {
            message: 'Initial products loaded successfully',
            total: initialData.length,
            data: {
                created: prodCreated,
                found: prodFound,
                errors: prodError,
            },
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map