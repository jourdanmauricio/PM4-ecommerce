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
exports.Orders = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
const class_transformer_1 = require("class-transformer");
let Orders = class Orders {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("./users.entity").Users }, orderDetail: { required: true, type: () => require("./orderDetails.entity").OrderDetails } };
    }
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Orders.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Orders.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Orders.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.Users)
], Orders.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderDetails_entity_1.OrderDetails, (orderDetail) => orderDetail.order),
    __metadata("design:type", orderDetails_entity_1.OrderDetails)
], Orders.prototype, "orderDetail", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)('orders')
], Orders);
//# sourceMappingURL=orders.entity.js.map