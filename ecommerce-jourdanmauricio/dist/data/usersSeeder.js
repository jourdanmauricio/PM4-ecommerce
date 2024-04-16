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
exports.AdminUserSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const user_fake_1 = require("./user.fake");
const bcrypt = require("bcrypt");
let AdminUserSeeder = class AdminUserSeeder {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async runAdmin() {
        const users = await this.userRepository.find();
        if (users.length)
            return;
        const adminUser = new users_entity_1.Users();
        adminUser.name = 'Mauricio Jourdan';
        adminUser.email = 'jourdanmau@mail.com';
        adminUser.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
        adminUser.phone = 2214529298;
        adminUser.country = 'Argentina';
        adminUser.address = 'Av 7 nro 1532';
        adminUser.city = 'La Plata';
        adminUser.isAdmin = true;
        await this.userRepository.save(adminUser);
    }
    async runCustomers() {
        const user = await this.userRepository.findOneBy({
            isAdmin: false,
        });
        if (user)
            return;
        const customers = (0, user_fake_1.generateUsers)(22);
        for await (const customer of customers) {
            const newCustomer = new users_entity_1.Users();
            newCustomer.name = customer.name;
            newCustomer.email = customer.email;
            newCustomer.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
            newCustomer.phone = customer.phone;
            newCustomer.country = customer.country;
            newCustomer.address = customer.address;
            newCustomer.city = customer.city;
            newCustomer.isAdmin = false;
            await this.userRepository.save(newCustomer);
        }
    }
    async runTestCustomer() {
        const user = await this.userRepository.findOneBy({
            email: 'jourdanpao@mail.com',
        });
        if (user)
            return;
        const customerUser = new users_entity_1.Users();
        customerUser.name = 'Paola Jourdan';
        customerUser.email = 'jourdanpao@mail.com';
        customerUser.password = await bcrypt.hash(process.env.USERS_PASSWORD, 10);
        customerUser.phone = 2214529298;
        customerUser.country = 'Argentina';
        customerUser.address = 'Av 7 nro 1532';
        customerUser.city = 'La Plata';
        customerUser.isAdmin = false;
        await this.userRepository.save(customerUser);
    }
};
exports.AdminUserSeeder = AdminUserSeeder;
exports.AdminUserSeeder = AdminUserSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminUserSeeder);
//# sourceMappingURL=usersSeeder.js.map