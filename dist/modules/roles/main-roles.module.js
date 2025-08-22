"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRolesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const applications_module_1 = require("./applications/applications.module");
const modules_module_1 = require("./modules/modules.module");
const permissions_module_1 = require("./permissions/permissions.module");
const roles_module_1 = require("./roles/roles.module");
const role_permissions_module_1 = require("./role-permissions/role-permissions.module");
let MainRolesModule = class MainRolesModule {
};
exports.MainRolesModule = MainRolesModule;
exports.MainRolesModule = MainRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            applications_module_1.ApplicationsModule,
            modules_module_1.ModulesModule,
            permissions_module_1.PermissionsModule,
            roles_module_1.RolesModule,
            role_permissions_module_1.RolePermissionsModule
        ],
    })
], MainRolesModule);
//# sourceMappingURL=main-roles.module.js.map