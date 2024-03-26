"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineEventsModule = void 0;
const machine_events_service_1 = require("./machine-events.service");
const common_1 = require("@nestjs/common");
const monitor_module_1 = require("../monitor/monitor.module");
let MachineEventsModule = exports.MachineEventsModule = class MachineEventsModule {
};
exports.MachineEventsModule = MachineEventsModule = __decorate([
    (0, common_1.Module)({
        imports: [monitor_module_1.MonitorModule],
        controllers: [],
        providers: [machine_events_service_1.MachineEventsService],
    })
], MachineEventsModule);
//# sourceMappingURL=machine-events.module.js.map