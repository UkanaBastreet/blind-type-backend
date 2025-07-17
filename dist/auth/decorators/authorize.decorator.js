"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = Authorize;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const roles_decorator_1 = require("./roles.decorator");
const role_guard_1 = require("../guards/role.guard");
function Authorize(roles) {
    if (roles.length !== 0) {
        return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard));
    }
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=authorize.decorator.js.map