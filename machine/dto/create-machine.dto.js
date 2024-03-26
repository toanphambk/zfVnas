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
exports.CreateMachineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_not_exists_validator_1 = require("../../utils/validators/is-not-exists.validator");
class CreateMachineDto {
}
exports.CreateMachineDto = CreateMachineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(is_not_exists_validator_1.IsNotExist, ['Machine', 'systemID'], {
        message: 'System ID already exists',
    }),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "systemID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'L001' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "lineID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Station 1' }),
    (0, class_validator_1.Validate)(is_not_exists_validator_1.IsNotExist, ['Machine', 'stationName'], {
        message: 'Station Name already exists',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "stationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'S001' }),
    (0, class_validator_1.Validate)(is_not_exists_validator_1.IsNotExist, ['Machine', 'stationID'], {
        message: 'Station ID already exists',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "stationID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'machine Description' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '192.168.1.1' }),
    (0, class_validator_1.Validate)(is_not_exists_validator_1.IsNotExist, ['Machine', 'ipAddress'], {
        message: 'ip Address already exists',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMachineDto.prototype, "ip", void 0);
//# sourceMappingURL=create-machine.dto.js.map