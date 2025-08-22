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
exports.ApplicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const modules_dto_1 = require("../../modules/dto/modules.dto");
class ApplicationDto {
    id;
    name;
    created_at;
    modules;
}
exports.ApplicationDto = ApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the application',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ApplicationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the application',
        example: 'My Application',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApplicationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date of the application',
        example: '2023-01-01T00:00:00Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApplicationDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modules related to the application',
        type: [modules_dto_1.ModulesWithExcludedDto],
        example: [{ id: 1, name: 'Module1', description: 'Description1' }, { id: 2, name: 'Module2', description: 'Description2' }],
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ApplicationDto.prototype, "modules", void 0);
//# sourceMappingURL=application.dto.js.map