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
exports.Machine = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const shift_entity_1 = require("../../shift/entities/shift.entity");
const machineEvent_entity_1 = require("../../monitor/entities/machineEvent.entity");
const qrCode_entity_1 = require("../../qr-code/entities/qrCode.entity");
const rfid_entity_1 = require("../../qr-code/entities/rfid.entity");
const record_entity_1 = require("../../mes/entity/record.entity");
let Machine = exports.Machine = class Machine {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The unique identifier of the machine',
    }),
    __metadata("design:type", Number)
], Machine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SystemID' }),
    (0, swagger_1.ApiProperty)({
        example: 'SYS001',
        description: 'System ID of the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "systemID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LineID' }),
    (0, swagger_1.ApiProperty)({
        example: 'LINE01',
        description: 'Line ID of the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "lineID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'StationName' }),
    (0, swagger_1.ApiProperty)({
        example: 'Station 1',
        description: 'Name of the station in the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "stationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'StationID' }),
    (0, swagger_1.ApiProperty)({
        example: 'STN01',
        description: 'Station ID in the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "stationID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        example: 'This line produces widgets',
        description: 'Description of the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ipAddress' }),
    (0, swagger_1.ApiProperty)({
        example: '192.168.1.1',
        description: 'IP address of the machine',
    }),
    __metadata("design:type", String)
], Machine.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => shift_entity_1.Shift, (shift) => shift.machine),
    __metadata("design:type", Array)
], Machine.prototype, "shifts", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => record_entity_1.Record, (record) => record.machine),
    __metadata("design:type", Array)
], Machine.prototype, "records", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => qrCode_entity_1.Qrcode, (qrcode) => qrcode.machine),
    __metadata("design:type", Array)
], Machine.prototype, "qrcodes", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => rfid_entity_1.Rfid, (rfid) => rfid.machine),
    __metadata("design:type", Array)
], Machine.prototype, "rfids", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => machineEvent_entity_1.MachineEvent, (machineEvents) => machineEvents.machine),
    __metadata("design:type", Array)
], Machine.prototype, "machineEvents", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Creation date of the machine record',
    }),
    __metadata("design:type", Date)
], Machine.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Last update date of the machine record',
    }),
    __metadata("design:type", Date)
], Machine.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Deletion date of the machine record',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Machine.prototype, "deletedAt", void 0);
exports.Machine = Machine = __decorate([
    (0, typeorm_1.Entity)()
], Machine);
//# sourceMappingURL=machine.entity.js.map