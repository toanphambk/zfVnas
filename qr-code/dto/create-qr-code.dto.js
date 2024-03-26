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
exports.CreateQrCodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const machine_entity_1 = require("../../machine/entities/machine.entity");
const is_record_exist_validator_1 = require("../../utils/validators/is-record-exist.validator");
class CreateQrCodeDto {
}
exports.CreateQrCodeDto = CreateQrCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'abc123',
        description: 'barcode scan by the system',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQrCodeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { id: 1 },
        description: 'The machine where the QR code is generated',
        type: () => swagger_1.PartialType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(is_record_exist_validator_1.IsRecordExist, ['Machine']),
    __metadata("design:type", machine_entity_1.Machine)
], CreateQrCodeDto.prototype, "machine", void 0);
//# sourceMappingURL=create-qr-code.dto.js.map