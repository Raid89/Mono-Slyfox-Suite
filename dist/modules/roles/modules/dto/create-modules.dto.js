"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModulesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const modules_dto_1 = require("./modules.dto");
class CreateModulesDto extends (0, swagger_1.PickType)(modules_dto_1.ModulesDto, [
    'application_id',
    'name',
    'description',
]) {
}
exports.CreateModulesDto = CreateModulesDto;
//# sourceMappingURL=create-modules.dto.js.map