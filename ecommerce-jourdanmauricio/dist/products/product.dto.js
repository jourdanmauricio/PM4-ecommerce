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
exports.UpdateProductDto = exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "El nombre del producto debe ser una cadena de texto, m\u00E1ximo 50 caracteres", example: "Iphone 15", maxLength: 50 }, description: { required: true, type: () => String, description: "La descripci\u00F3n del producto debe ser una cadena de texto no nula", example: "The best smartphone in the world" }, price: { required: true, type: () => Number, description: "El precio debe ser un n\u00FAmero positivo", example: 100, minimum: 1 }, stock: { required: true, type: () => Number, description: "El stock debe ser un n\u00FAmero positivo", example: 10, minimum: 1 }, imgUrl: { required: false, type: () => String, description: "La imagen debe ser una url y es opcional", example: "https://res.cloudinary.com/dn7npxeof/image/upload/v1712238917/Henry/PM4-ecommerce/Sin_imagen_disponible_zxruow.webp" }, categoryId: { required: true, type: () => String, description: "Id de la categor\u00EDa del producto, es obligatoria", example: "bf9a36ba-363e-4a24-9a11-84a96b3a901e" } };
    }
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imgUrl", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
class UpdateProductDto extends (0, swagger_1.PartialType)(CreateProductDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=product.dto.js.map