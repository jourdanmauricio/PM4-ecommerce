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
                address: 'Av 7 nro 1377 depto 2',
                phone: '22122222222',
                country: 'Argentina',
                city: 'La Plata',
            },
            {
                id: 3,
                name: 'Nancy',
                email: 'nan@mail.com',
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
};
exports.UsersRespository = UsersRespository;
exports.UsersRespository = UsersRespository = __decorate([
    (0, common_1.Injectable)()
], UsersRespository);
//# sourceMappingURL=users.repository.js.map