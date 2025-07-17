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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const add_game_dto_1 = require("./dto/add-game.dto");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    getRandomText(language, mode, time, length, punctuation, numbers) {
        const params = {
            language: language || 'en',
            time: time,
            length: length,
            punctuation: punctuation,
            numbers: numbers,
            mode: mode,
        };
        return this.gameService.getRandomText(params);
    }
    addGameResults(userId, dto) {
        return this.gameService.addGameResults(userId, dto);
    }
    getGamesHistory(userId) {
        return this.gameService.getHistoryById(userId);
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Get)('/practice'),
    __param(0, (0, common_1.Query)('language')),
    __param(1, (0, common_1.Query)('mode')),
    __param(2, (0, common_1.Query)('time')),
    __param(3, (0, common_1.Query)('length')),
    __param(4, (0, common_1.Query)('punctuation')),
    __param(5, (0, common_1.Query)('numbers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Boolean, Boolean]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getRandomText", null);
__decorate([
    (0, common_1.Post)('/results/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_game_dto_1.AddGameDto]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "addGameResults", null);
__decorate([
    (0, common_1.Get)('/history/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGamesHistory", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map