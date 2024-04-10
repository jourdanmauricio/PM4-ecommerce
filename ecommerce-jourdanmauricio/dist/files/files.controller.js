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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const products_service_1 = require("../products/products.service");
const uuid_1 = require("uuid");
const auth_guard_1 = require("../guards/auth.guard");
let FilesController = class FilesController {
    constructor(filesService, productsService) {
        this.filesService = filesService;
        this.productsService = productsService;
    }
    async uploadProductImage(id, file) {
        const image = await this.filesService.uploadImage(file);
        if (!image)
            throw new common_1.InternalServerErrorException('Error cargando la imagen');
        return await this.productsService.update(id, {
            imgUrl: image.secure_url,
        });
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Put)('uploadImage/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200000,
                message: `El archivo debe ser menor a 200kb`,
            }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof uuid_1.v4 !== "undefined" && uuid_1.v4) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadProductImage", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        products_service_1.ProductsService])
], FilesController);
//# sourceMappingURL=files.controller.js.map