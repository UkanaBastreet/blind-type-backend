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
exports.Settings = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const settings_type_1 = require("../types/settings.type");
let Settings = class Settings {
};
exports.Settings = Settings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Settings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: settings_type_1.ThemeEnum }),
    __metadata("design:type", String)
], Settings.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: settings_type_1.LanguageEnum }),
    __metadata("design:type", String)
], Settings.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.settings),
    __metadata("design:type", String)
], Settings.prototype, "userId", void 0);
exports.Settings = Settings = __decorate([
    (0, typeorm_1.Entity)()
], Settings);
//# sourceMappingURL=settings.entity.js.map