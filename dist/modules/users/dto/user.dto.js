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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    id;
    company_id;
    name;
    email;
    is_active;
    document;
    isEmailVerified;
    created_at;
    role_id;
    email_verification_token;
    hashedRt;
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], UserDto.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Perez' }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'juan@email.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234567890' }),
    __metadata("design:type", String)
], UserDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isEmailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-06T12:00:00.000Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], UserDto.prototype, "role_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], UserDto.prototype, "email_verification_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], UserDto.prototype, "hashedRt", void 0);
//# sourceMappingURL=user.dto.js.map