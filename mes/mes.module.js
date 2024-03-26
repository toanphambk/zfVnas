"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesModule = void 0;
const common_1 = require("@nestjs/common");
const mes_service_1 = require("./mes.service");
const plc_communication_module_1 = require("../plc-communication/plc-communication.module");
const machine_module_1 = require("../machine/machine.module");
const typeorm_1 = require("@nestjs/typeorm");
const recordData_entity_1 = require("./entity/recordData.entity");
const record_entity_1 = require("./entity/record.entity");
const mes_controller_1 = require("./mes.controller");
let MesModule = exports.MesModule = class MesModule {
};
exports.MesModule = MesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            plc_communication_module_1.PlcCommunicationModule,
            machine_module_1.MachineModule,
            typeorm_1.TypeOrmModule.forFeature([recordData_entity_1.RecordData, record_entity_1.Record]),
        ],
        providers: [mes_service_1.MesService],
        controllers: [mes_controller_1.MesController],
        exports: [mes_service_1.MesService],
    })
], MesModule);
//# sourceMappingURL=mes.module.js.map