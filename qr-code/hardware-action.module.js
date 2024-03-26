"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareActionModule = void 0;
const common_1 = require("@nestjs/common");
const hardware_action_service_1 = require("./hardware-action.service");
const plc_communication_module_1 = require("../plc-communication/plc-communication.module");
const qrCode_entity_1 = require("./entities/qrCode.entity");
const typeorm_1 = require("@nestjs/typeorm");
const hardware_action_controller_1 = require("./hardware-action.controller");
const rfid_entity_1 = require("./entities/rfid.entity");
let HardwareActionModule = exports.HardwareActionModule = class HardwareActionModule {
};
exports.HardwareActionModule = HardwareActionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([qrCode_entity_1.Qrcode, rfid_entity_1.Rfid]), plc_communication_module_1.PlcCommunicationModule],
        controllers: [hardware_action_controller_1.HardwareActionController],
        providers: [hardware_action_service_1.HardwareActionService],
        exports: [hardware_action_service_1.HardwareActionService],
    })
], HardwareActionModule);
//# sourceMappingURL=hardware-action.module.js.map