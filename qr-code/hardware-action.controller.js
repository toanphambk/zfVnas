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
exports.HardwareActionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const create_qr_code_dto_1 = require("./dto/create-qr-code.dto");
const hardware_action_service_1 = require("./hardware-action.service");
const qrCode_entity_1 = require("./entities/qrCode.entity");
const create_rfid_dto_1 = require("./dto/create-rfid.dto");
const rfid_entity_1 = require("./entities/rfid.entity");
let HardwareActionController = exports.HardwareActionController = class HardwareActionController {
    constructor(qrCodeService) {
        this.qrCodeService = qrCodeService;
    }
    createQrCode(createDto) {
        return this.qrCodeService.createQrCode(createDto);
    }
    createRFID(createDto) {
        return this.qrCodeService.createRFID(createDto);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The QR code has been created.',
        type: qrCode_entity_1.Qrcode,
    }),
    (0, common_1.Post)('/createQrCode'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qr_code_dto_1.CreateQrCodeDto]),
    __metadata("design:returntype", Promise)
], HardwareActionController.prototype, "createQrCode", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The RFID entry has been created.',
        type: rfid_entity_1.Rfid,
    }),
    (0, common_1.Post)('/createRFID'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rfid_dto_1.CreateRFIDDto]),
    __metadata("design:returntype", Promise)
], HardwareActionController.prototype, "createRFID", null);
exports.HardwareActionController = HardwareActionController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('QR Code'),
    (0, common_1.Controller)('qrCode'),
    __metadata("design:paramtypes", [hardware_action_service_1.HardwareActionService])
], HardwareActionController);
//# sourceMappingURL=hardware-action.controller.js.map