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
exports.UpdateMachineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateMachineDto {
}
exports.UpdateMachineDto = UpdateMachineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "systemID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'L001' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "lineID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Station 1' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "stationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'S001' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "stationID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated machine Description' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '192.168.1.1' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMachineDto.prototype, "ip", void 0);
//# sourceMappingURL=update-machine.dto.js.map