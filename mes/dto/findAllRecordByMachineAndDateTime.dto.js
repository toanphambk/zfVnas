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
exports.FindAllRecordByMachineAndDateTimeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FindAllRecordByMachineAndDateTimeDto {
}
exports.FindAllRecordByMachineAndDateTimeDto = FindAllRecordByMachineAndDateTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Filter record by machine ID', example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FindAllRecordByMachineAndDateTimeDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter records by start date and time',
        example: '2024-03-15T00:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FindAllRecordByMachineAndDateTimeDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter records by end date and time',
        example: '2024-03-25T00:00:00Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FindAllRecordByMachineAndDateTimeDto.prototype, "endTime", void 0);
//# sourceMappingURL=findAllRecordByMachineAndDateTime.dto.js.map