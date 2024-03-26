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
exports.MachineEventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const fs_1 = require("fs");
const monitor_service_manager_service_1 = require("../monitor/monitor-service-manager.service");
let MachineEventsService = exports.MachineEventsService = class MachineEventsService {
    constructor(monitorServiceManager) {
        this.monitorServiceManager = monitorServiceManager;
    }
    handleMachineDataChangeEvent({ key, val, machine }) {
        try {
            const monitorService = this.monitorServiceManager.getMonitorService(machine);
            if (key == 'mesReadFlag' && val == 1) {
                void monitorService.mesRequesHandler(machine);
            }
        }
        catch (error) {
            const filePath = './error.log';
            if ((0, fs_1.existsSync)(filePath)) {
                (0, fs_1.appendFileSync)(filePath, error.toString());
            }
            else {
                (0, fs_1.writeFileSync)(filePath, error.toString());
            }
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('machine.data.change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MachineEventsService.prototype, "handleMachineDataChangeEvent", null);
exports.MachineEventsService = MachineEventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [monitor_service_manager_service_1.MonitorServiceManager])
], MachineEventsService);
//# sourceMappingURL=machine-events.service.js.map