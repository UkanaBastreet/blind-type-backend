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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const update_stats_dto_1 = require("./dto/update-stats.dto");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    getPublicStats(userId) {
        return this.statsService.getPublicStats(userId);
    }
    updateStats(userId, dto) {
        this.statsService.updateStats(userId, dto);
    }
    getLeaderboard() {
        return this.statsService.getLeaderboard();
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getPublicStats", null);
__decorate([
    (0, common_1.Patch)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stats_dto_1.UpdateStatsDto]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "updateStats", null);
__decorate([
    (0, common_1.Get)('/leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getLeaderboard", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)('stat'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map