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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("./categories.entity");
const typeorm_2 = require("typeorm");
const initialData = require("./../data/initialData.json");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async getCategories() {
        return await this.categoriesRepository.find();
    }
    async addCategorie(data) {
        const newCategory = this.categoriesRepository.create(data);
        const result = await this.categoriesRepository
            .save(newCategory)
            .catch((err) => {
            throw new common_1.BadRequestException(err.detail);
        });
        return result;
    }
    async preLoadCategories() {
        const catCreated = [];
        const catFound = [];
        const unique_categories = new Set(initialData.map((product) => product.category));
        for await (const category of unique_categories) {
            const found = await this.categoriesRepository.findOneBy({
                name: category,
            });
            if (!found) {
                const newCategory = await this.addCategorie({ name: category });
                catCreated.push({ id: newCategory.id, name: newCategory.name });
            }
            else {
                catFound.push({ id: found.id, name: found.name });
            }
        }
        return {
            message: 'Initial categories loaded successfully',
            total: unique_categories.size,
            data: {
                created: catCreated,
                found: catFound,
            },
        };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map