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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const mes_service_1 = require("./mes.service");
const record_entity_1 = require("./entity/record.entity");
const findAllRecordByMachineAndDateTime_dto_1 = require("./dto/findAllRecordByMachineAndDateTime.dto");
const getDailyLineChartData_dto_1 = require("./dto/getDailyLineChartData.dto");
let MesController = exports.MesController = class MesController {
    constructor(mesService) {
        this.mesService = mesService;
    }
    findAllRecord() {
        return this.mesService.getAllRecords();
    }
    findAllRecordByMachineAndDateTime(query) {
        return this.mesService.getAllRecordsByMachineAndTime(query);
    }
    getDailyLineChartData(query) {
        return this.mesService.getDailyLineChartData(query);
    }
    findOneRecord(moduleSerialNo) {
        return this.mesService.getOneRecord({ moduleSerialNo });
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Array of all finded Record.',
        type: [record_entity_1.Record],
    }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MesController.prototype, "findAllRecord", null);
__decorate([
    (0, common_1.Get)('machineDateTime'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'list of found record matched query.',
        type: [record_entity_1.Record],
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAllRecordByMachineAndDateTime_dto_1.FindAllRecordByMachineAndDateTimeDto]),
    __metadata("design:returntype", Promise)
], MesController.prototype, "findAllRecordByMachineAndDateTime", null);
__decorate([
    (0, common_1.Get)('dailyLineChartData'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Data for daily record line chart',
        type: [Number],
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getDailyLineChartData_dto_1.GetDailyLineChartDataDto]),
    __metadata("design:returntype", Promise)
], MesController.prototype, "getDailyLineChartData", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Single message retrieved successfully.',
        type: record_entity_1.Record,
    }),
    (0, common_1.Get)(':moduleSerialNo'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('moduleSerialNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MesController.prototype, "findOneRecord", null);
exports.MesController = MesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Mes'),
    (0, common_1.Controller)('mes'),
    __metadata("design:paramtypes", [mes_service_1.MesService])
], MesController);
//# sourceMappingURL=mes.controller.js.map