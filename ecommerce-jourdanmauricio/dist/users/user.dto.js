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
exports.LoginUserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const MatchPass_decorator_1 = require("./../decorators/MatchPass.decorator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "El nombre del usuario debe tener como m\u00EDnimo 3 caracteres", example: "Paola", minLength: 3, maxLength: 50 }, email: { required: true, type: () => String, description: "El email del usuario debe ser un email v\u00E1lido", example: "jourdanpao@mail.com" }, password: { required: true, type: () => String, description: "No utlices informaci\u00F3n personal ni compartas tu contrase\u00F1a", example: "Aa$12345678", minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/" }, confPassword: { required: true, type: () => String, description: "No utlices informaci\u00F3n personal ni compartas tu contrase\u00F1a", example: "Aa$12345678" }, address: { required: true, type: () => String, description: "Direcci\u00F3n: m\u00EDnimo 3, m\u00E1ximo 80 cracteres", minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number, description: "N\u00FAmero de tel\u00E9fono: Debe ser num\u00E9rico", example: 1145454545 }, country: { required: false, type: () => String, description: "Pa\u00EDs: m\u00EDnimo: 5, m\u00E1ximo: 20", example: "Argentina", minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, description: "Ciudad: m\u00EDnimo: 5, m\u00E1ximo: 20", minLength: 5, maxLength: 20 }, isAdmin: { required: true, type: () => Boolean, description: "Administrador: No de debe enviar", example: false } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(MatchPass_decorator_1.MatchPass, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
class UpdateUserDto extends (0, swagger_1.PartialType)(CreateUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserDto = UpdateUserDto;
class LoginUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, description: "El email del usuario debe ser un email v\u00E1lido", example: "jourdanpao@mail.com" }, password: { required: true, type: () => String, description: "No utlices informaci\u00F3n personal ni compartas tu contrase\u00F1a", example: "Aa$12345678" } };
    }
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=user.dto.js.map