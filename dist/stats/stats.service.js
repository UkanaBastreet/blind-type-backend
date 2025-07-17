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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const stats_entity_1 = require("./entities/stats.entity");
const typeorm_2 = require("@nestjs/typeorm");
let StatsService = class StatsService {
    constructor(statsRepository) {
        this.statsRepository = statsRepository;
    }
    async getPublicStats(userId) {
        return this.statsRepository.findOne({ where: { userId } });
    }
    async updateStats(userId, dto) {
        await this.statsRepository.update({ userId }, dto);
        return await this.statsRepository.findOne({ where: { userId } });
    }
    async getLeaderboard() {
        return this.statsRepository.find({ take: 10 });
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(stats_entity_1.Stats)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map