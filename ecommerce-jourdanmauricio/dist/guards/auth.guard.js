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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorators/public.decorator");
let AuthGuard = class AuthGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.get(public_decorator_1.IS_PUBLIC_KEY, context.getHandler());
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1] ?? '';
        if (!token)
            throw new common_1.UnauthorizedException('Unauthorized');
        try {
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, { secret });
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;
            console.log('request.user', request.user);
            return true;
        }
        catch (err) {
            if (!token)
                throw new common_1.UnauthorizedException('Unauthorized');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map