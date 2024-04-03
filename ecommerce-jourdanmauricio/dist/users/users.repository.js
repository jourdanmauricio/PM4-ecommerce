"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRespository = void 0;
const common_1 = require("@nestjs/common");
let UsersRespository = class UsersRespository {
    constructor() {
        this.users = [
            {
                id: 1,
                name: 'Mauri',
                email: 'mauri@mail.com',
                password: '12345678',
                address: 'Av 7 nro 1377 depto 1',
                phone: '22111111111',
                country: 'Argentina',
                city: 'La Plata',
            },
            {
                id: 2,
                name: 'Paola',
                email: 'pao@mail.com',
                password: '12345678',
                address: 'Av 7 nro 1377 depto 2',
                phone: '22122222222',
                country: 'Argentina',
                city: 'La Plata',
            },
            {
                id: 3,
                name: 'Nancy',
                email: 'nan@mail.com',
                password: '12345678',
                address: 'Av 7 nro 1377 depto 3',
                phone: '22133333333',
                country: 'Argentina',
                city: 'La Plata',
            },
        ];
    }
    async getUsers() {
        return this.users;
    }
    async getById(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async createUser(user) {
        const id = this.users.length + 1;
        this.users = [...this.users, { id, ...user }];
        return { id, ...user };
    }
    async updateUser(id, changes) {
        const user = await this.getById(id);
        if (user) {
            const index = this.users.findIndex((item) => item.id === id);
            this.users[index] = {
                ...user,
                ...changes,
            };
            return this.users[index];
        }
        return null;
    }
    async deleteUser(id) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('User not found');
        this.users.splice(index, 1);
        return { id };
    }
    async signin(credentials) {
        const { email, password } = credentials;
        console.log(password);
        const user = this.users.find((user) => user.email === email);
        if (!user)
            throw new common_1.UnauthorizedException('Email o password incorrectos');
        if (user.password !== password)
            throw new common_1.UnauthorizedException('Email o password incorrectos');
        return user;
    }
};
exports.UsersRespository = UsersRespository;
exports.UsersRespository = UsersRespository = __decorate([
    (0, common_1.Injectable)()
], UsersRespository);
//# sourceMappingURL=users.repository.js.map