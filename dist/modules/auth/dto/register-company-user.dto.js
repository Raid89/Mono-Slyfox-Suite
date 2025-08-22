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
exports.RegisterCompanyAndUserDto = exports.RegisterUserDto = exports.RegisterCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RegisterCompanyDto {
    name;
    email;
    nit;
    address;
    phone;
}
exports.RegisterCompanyDto = RegisterCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SlyFox S.A.S.' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contacto@slyfox.com.co' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789-04' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "nit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calle 123 #45-67 Bogotá' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3101234567' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterCompanyDto.prototype, "phone", void 0);
class RegisterUserDto {
    fullName;
    email;
    document;
    password;
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SlyFox S.A.S.' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contacto@slyfox.com.co' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789-04' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Slyfox123*' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
class RegisterCompanyAndUserDto {
    company;
    user;
}
exports.RegisterCompanyAndUserDto = RegisterCompanyAndUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: RegisterCompanyDto }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", RegisterCompanyDto)
], RegisterCompanyAndUserDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RegisterUserDto }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", RegisterUserDto)
], RegisterCompanyAndUserDto.prototype, "user", void 0);
//# sourceMappingURL=register-company-user.dto.js.map