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
exports.ModulesWithExcludedDto = exports.ModulesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ModulesDto {
    id;
    application_id;
    name;
    description;
    created_at;
}
exports.ModulesDto = ModulesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the module',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ModulesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the module',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ModulesDto.prototype, "application_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the module',
        example: 'My Module',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModulesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the module',
        example: 'This is my module',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModulesDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date of the module',
        example: '2023-01-01T00:00:00Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ModulesDto.prototype, "created_at", void 0);
class ModulesWithExcludedDto extends (0, swagger_1.PickType)(ModulesDto, [
    'id',
    'name',
    'description',
]) {
}
exports.ModulesWithExcludedDto = ModulesWithExcludedDto;
//# sourceMappingURL=modules.dto.js.map