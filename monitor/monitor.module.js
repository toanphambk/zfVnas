"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModule = void 0;
const common_1 = require("@nestjs/common");
const monitor_service_manager_controller_1 = require("./monitor-service-manager.controller");
const monitor_service_manager_service_1 = require("./monitor-service-manager.service");
const machine_module_1 = require("../machine/machine.module");
const plc_communication_module_1 = require("../plc-communication/plc-communication.module");
const monitor_service_1 = require("./monitor.service");
const mes_service_1 = require("../mes/mes.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const mes_module_1 = require("../mes/mes.module");
let MonitorModule = exports.MonitorModule = class MonitorModule {
};
exports.MonitorModule = MonitorModule = __decorate([
    (0, common_1.Module)({
        imports: [machine_module_1.MachineModule, plc_communication_module_1.PlcCommunicationModule, event_emitter_1.EventEmitter2, mes_module_1.MesModule],
        controllers: [monitor_service_manager_controller_1.MonitorServiceManagerController],
        providers: [
            {
                provide: 'MonitorServiceFactory',
                useFactory: (PlcCommunicationServiceFactory, mesService) => {
                    return (machine) => new monitor_service_1.MonitorService(machine, PlcCommunicationServiceFactory, mesService);
                },
                inject: ['PlcCommunicationServiceFactory', mes_service_1.MesService],
            },
            monitor_service_manager_service_1.MonitorServiceManager,
        ],
        exports: [monitor_service_manager_service_1.MonitorServiceManager],
    })
], MonitorModule);
//# sourceMappingURL=monitor.module.js.map