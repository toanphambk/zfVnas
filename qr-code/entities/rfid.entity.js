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
exports.Rfid = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const machine_entity_1 = require("../../machine/entities/machine.entity");
let Rfid = exports.Rfid = class Rfid {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The unique identifier of the RFID tag',
    }),
    __metadata("design:type", Number)
], Rfid.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rfidTag' }),
    (0, swagger_1.ApiProperty)({
        example: '00A1B2C3D4',
        description: 'The RFID tag scanned by the system',
    }),
    __metadata("design:type", String)
], Rfid.prototype, "rfidTag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => machine_entity_1.Machine, (machine) => machine.rfids),
    (0, swagger_1.ApiProperty)({
        type: () => machine_entity_1.Machine,
        description: 'The machine associated with this QR code',
    }),
    __metadata("design:type", machine_entity_1.Machine)
], Rfid.prototype, "machine", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Scan date of the RFID tag',
    }),
    __metadata("design:type", Date)
], Rfid.prototype, "createdAt", void 0);
exports.Rfid = Rfid = __decorate([
    (0, typeorm_1.Entity)()
], Rfid);
//# sourceMappingURL=rfid.entity.js.map