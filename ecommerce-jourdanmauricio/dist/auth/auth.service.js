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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("./../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("./../models/roles.enum");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signin(credentials) {
        const { email, password } = credentials;
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credenttials');
        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass)
            throw new common_1.UnauthorizedException('Invalid credenttials');
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            roles: [user.isAdmin ? roles_enum_1.Role.ADMIN : roles_enum_1.Role.USER],
        };
        const token = this.jwtService.sign(userPayload);
        return { user, token };
    }
    async signup(user) {
        const dbUser = await this.usersService.findByEmail(user.email);
        if (dbUser)
            throw new common_1.BadRequestException('Email is already in use');
        try {
            const hashedPass = await bcrypt.hash(user.password, 10);
            if (!hashedPass)
                throw new common_1.BadRequestException('Password could not be hashed');
            return this.usersService.create({ ...user, password: hashedPass });
        }
        catch (err) {
            throw new common_1.BadRequestException('Constraint PK');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map