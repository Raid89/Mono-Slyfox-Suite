"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModulesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_modules_dto_1 = require("./create-modules.dto");
class UpdateModulesDto extends (0, swagger_1.PartialType)(create_modules_dto_1.CreateModulesDto) {
}
exports.UpdateModulesDto = UpdateModulesDto;
//# sourceMappingURL=update-modules.dto.js.map