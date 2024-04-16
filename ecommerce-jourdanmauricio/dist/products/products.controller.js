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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("./../guards/auth.guard");
const public_decorator_1 = require("./../decorators/public.decorator");
const products_service_1 = require("./products.service");
const product_dto_1 = require("./product.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getProducts(page, limit) {
        return this.productsService.findAll(page, limit);
    }
    addProducts() {
        return this.productsService.preLoadProducts();
    }
    getProductById(id) {
        return this.productsService.findOne(id);
    }
    createProduct(product) {
        return this.productsService.create(product);
    }
    updateProduct(id, payload) {
        return this.productsService.update(id, payload);
    }
    deleteProduct(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200, type: require("../entities/products.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/products.entity").Products }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/products.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/products.entity").Products }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map