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
exports.PermissionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PermissionsDto {
    id;
    module_id;
    name;
    description;
}
exports.PermissionsDto = PermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the permission',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PermissionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the permission',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PermissionsDto.prototype, "module_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the permission',
        example: 'My Permissions',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PermissionsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the permission',
        example: 'This is my permission',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PermissionsDto.prototype, "description", void 0);
//# sourceMappingURL=permissions.dto.js.map