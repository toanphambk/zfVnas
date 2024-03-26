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
exports.Record = void 0;
const swagger_1 = require("@nestjs/swagger");
const machine_entity_1 = require("../../machine/entities/machine.entity");
const typeorm_1 = require("typeorm");
const recordData_entity_1 = require("./recordData.entity");
let Record = exports.Record = class Record {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Record.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        example: 'BM0624031114090',
        description: 'Serial number of the record',
    }),
    __metadata("design:type", String)
], Record.prototype, "moduleSerialNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        example: '20240311140903',
        description: 'Date time of the record',
    }),
    __metadata("design:type", String)
], Record.prototype, "systemDt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Result of the record: 1:ok, 2:ng',
    }),
    __metadata("design:type", Number)
], Record.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The machine of the record',
        type: () => machine_entity_1.Machine,
    }),
    (0, typeorm_1.ManyToOne)(() => machine_entity_1.Machine, (machine) => machine.records),
    __metadata("design:type", machine_entity_1.Machine)
], Record.prototype, "machine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The record data of the record',
        type: () => [recordData_entity_1.RecordData],
    }),
    (0, typeorm_1.OneToMany)(() => recordData_entity_1.RecordData, (recordData) => recordData.record),
    __metadata("design:type", Array)
], Record.prototype, "recordDatas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Creation date of the machine record',
    }),
    __metadata("design:type", Date)
], Record.prototype, "createdAt", void 0);
exports.Record = Record = __decorate([
    (0, typeorm_1.Entity)()
], Record);
//# sourceMappingURL=record.entity.js.map