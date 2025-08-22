"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_permissions_dto_1 = require("./create-permissions.dto");
class UpdatePermissionsDto extends (0, swagger_1.PartialType)(create_permissions_dto_1.CreatePermissionsDto) {
}
exports.UpdatePermissionsDto = UpdatePermissionsDto;
//# sourceMappingURL=update-permissions.dto.js.map