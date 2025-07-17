"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stats_dto_1 = require("./create-stats.dto");
class UpdateStatsDto extends (0, mapped_types_1.PartialType)(create_stats_dto_1.CreateStatsDto) {
}
exports.UpdateStatsDto = UpdateStatsDto;
//# sourceMappingURL=update-stats.dto.js.map