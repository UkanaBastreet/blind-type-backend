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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const game_entity_1 = require("../../game/entities/game.entity");
const settings_entity_1 = require("../../settings/entities/settings.entity");
const stats_entity_1 = require("../../stats/entities/stats.entity");
const typeorm_1 = require("typeorm");
const role_enum_type_1 = require("../types/role-enum.type");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_type_1.RoleEnum, default: role_enum_type_1.RoleEnum.USER }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_entity_1.Game, (game) => game.userId),
    __metadata("design:type", Array)
], User.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stats_entity_1.Stats, (stat) => stat.userId),
    __metadata("design:type", stats_entity_1.Stats)
], User.prototype, "stats", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => settings_entity_1.Settings, (settings) => settings.userId),
    __metadata("design:type", settings_entity_1.Settings)
], User.prototype, "settings", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map