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
exports.GetTextDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const text_type_1 = require("../types/text.type");
const class_validator_1 = require("class-validator");
class GetTextDto {
}
exports.GetTextDto = GetTextDto;
__decorate([
    (0, class_validator_1.IsEnum)(text_type_1.languageEnum),
    (0, swagger_1.ApiProperty)({ description: '111', example: text_type_1.languageEnum.en }),
    __metadata("design:type", Number)
], GetTextDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(text_type_1.textModeEnum),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetTextDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], GetTextDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], GetTextDto.prototype, "length", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({ required: false }),
    __metadata("design:type", Boolean)
], GetTextDto.prototype, "punctuation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], GetTextDto.prototype, "numbers", void 0);
//# sourceMappingURL=get-text.dto.js.map