"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
const roles_decorator_1 = require("./roles.decorator");
function Auth(roles) {
    if (roles.length !== 0) {
        return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard));
    }
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=auth.decorator.js.map