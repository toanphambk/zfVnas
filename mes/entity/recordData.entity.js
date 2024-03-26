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
exports.RecordData = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const record_entity_1 = require("./record.entity");
const swagger_1 = require("@nestjs/swagger");
let RecordData = exports.RecordData = class RecordData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecordData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'OPID', description: 'The OPID of the record data' }),
    __metadata("design:type", String)
], RecordData.prototype, "OPID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 10, description: 'The value of CurDta_QD01' }),
    __metadata("design:type", Number)
], RecordData.prototype, "CurDta_QD01", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 20, description: 'The value of CurDta_QD02' }),
    __metadata("design:type", Number)
], RecordData.prototype, "CurDta_QD02", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 30, description: 'The value of CurDta_QD03' }),
    __metadata("design:type", Number)
], RecordData.prototype, "CurDta_QD03", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 40, description: 'The value of CurDta_QD04' }),
    __metadata("design:type", Number)
], RecordData.prototype, "CurDta_QD04", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 50, description: 'The value of PrvDta1_QD01' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta1_QD01", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 60, description: 'The value of PrvDta1_QD02' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta1_QD02", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 70, description: 'The value of PrvDta1_QD03' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta1_QD03", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 80, description: 'The value of PrvDta1_QD04' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta1_QD04", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 90, description: 'The value of PrvDta2_QD01' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta2_QD01", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 100, description: 'The value of PrvDta2_QD02' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta2_QD02", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 110, description: 'The value of PrvDta2_QD03' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta2_QD03", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 120, description: 'The value of PrvDta2_QD04' }),
    __metadata("design:type", Number)
], RecordData.prototype, "PrvDta2_QD04", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 3, description: 'The value of TryCnt' }),
    __metadata("design:type", Number)
], RecordData.prototype, "TryCnt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 5, description: 'The value of RT' }),
    __metadata("design:type", Number)
], RecordData.prototype, "RT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'The value of OType' }),
    __metadata("design:type", Number)
], RecordData.prototype, "OType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 10, description: 'The minimum value of QD01' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD01_Min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 100, description: 'The maximum value of QD01' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD01_Max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 20, description: 'The minimum value of QD02' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD02_Min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 200, description: 'The maximum value of QD02' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD02_Max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 30, description: 'The minimum value of QD03' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD03_Min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 300, description: 'The maximum value of QD03' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD03_Max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 40, description: 'The minimum value of QD04' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD04_Min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 400, description: 'The maximum value of QD04' }),
    __metadata("design:type", Number)
], RecordData.prototype, "QD04_Max", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'The name of the operator' }),
    __metadata("design:type", String)
], RecordData.prototype, "OperatorName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Some text', description: 'The additional text' }),
    __metadata("design:type", String)
], RecordData.prototype, "OPTxt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.ManyToOne)(() => record_entity_1.Record, (record) => record.recordDatas),
    __metadata("design:type", record_entity_1.Record)
], RecordData.prototype, "record", void 0);
exports.RecordData = RecordData = __decorate([
    (0, typeorm_1.Entity)()
], RecordData);
//# sourceMappingURL=recordData.entity.js.map