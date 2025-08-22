"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaToDto = prismaToDto;
const class_transformer_1 = require("class-transformer");
function prismaToDto(dtoClass, data) {
    return (0, class_transformer_1.plainToInstance)(dtoClass, data, {
        excludeExtraneousValues: true,
    });
}
//# sourceMappingURL=prisma-to-dto.js.map