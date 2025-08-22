"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permissions_dto_1 = require("./permissions.dto");
class CreatePermissionsDto extends (0, swagger_1.PickType)(permissions_dto_1.PermissionsDto, [
    'module_id',
    'name',
    'description',
]) {
}
exports.CreatePermissionsDto = CreatePermissionsDto;
//# sourceMappingURL=create-permissions.dto.js.map