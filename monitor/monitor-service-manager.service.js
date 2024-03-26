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
exports.MonitorServiceManager = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const machine_entity_1 = require("../machine/entities/machine.entity");
const machine_service_1 = require("../machine/machine.service");
const console_1 = require("console");
let MonitorServiceManager = exports.MonitorServiceManager = class MonitorServiceManager {
    constructor(machineService, monitorServiceFactory) {
        this.machineService = machineService;
        this.monitorServiceFactory = monitorServiceFactory;
        this.monitorServiceInstances = new Map();
        void this.createAllMonitorServices();
    }
    getAllMonitorServices() {
        return Array.from(this.monitorServiceInstances.values());
    }
    async createAllMonitorServices() {
        const machines = await this.machineService.findAll();
        machines.forEach((machine) => {
            this.createMonitorService(machine);
        });
    }
    createMonitorService(machine) {
        const machineId = machine.id;
        if (this.monitorServiceInstances.has(machineId)) {
            return this.monitorServiceInstances.get(machineId);
        }
        const monitorService = this.monitorServiceFactory(machine);
        this.monitorServiceInstances.set(machineId, monitorService);
        return monitorService;
    }
    async updateMonitorService(machine) {
        const machineId = machine.id;
        if (this.monitorServiceInstances.has(machineId)) {
            await this.deleteMonitorService(machine);
            this.createMonitorService(machine);
        }
        else {
            throw new Error(`Monitor service not found for machine ID ${machineId}`);
        }
    }
    async deleteMonitorService(machine) {
        const { id } = machine;
        try {
            const monitorService = this.getMonitorService(machine);
            if (monitorService) {
                await monitorService.removeMonitor();
                this.monitorServiceInstances.delete(id);
            }
        }
        catch (error) { }
    }
    getMonitorService(machine) {
        const machineId = machine.id;
        if (this.monitorServiceInstances.has(machineId)) {
            return this.monitorServiceInstances.get(machineId);
        }
        else {
            throw new Error(`Monitor service not found for machine ID ${machineId}`);
        }
    }
    getMonitorServicebyMachineID(machineId) {
        if (this.monitorServiceInstances.has(machineId)) {
            return this.monitorServiceInstances.get(machineId);
        }
        else {
            throw new Error(`Monitor service not found for machine ID ${machineId}`);
        }
    }
    getMonitorServiceState(machineId) {
        const monitorService = this.getMonitorServicebyMachineID(machineId);
        return monitorService.getState();
    }
    handleMachineCreate(event) {
        this.createMonitorService(event);
    }
    handleMachineUpdate(event) {
        try {
            void this.updateMonitorService(event);
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
    handleMachineDelete(event) {
        try {
            void this.deleteMonitorService(event);
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('machine.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [machine_entity_1.Machine]),
    __metadata("design:returntype", void 0)
], MonitorServiceManager.prototype, "handleMachineCreate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('machine.update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [machine_entity_1.Machine]),
    __metadata("design:returntype", void 0)
], MonitorServiceManager.prototype, "handleMachineUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)('machine.delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [machine_entity_1.Machine]),
    __metadata("design:returntype", void 0)
], MonitorServiceManager.prototype, "handleMachineDelete", null);
exports.MonitorServiceManager = MonitorServiceManager = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('MonitorServiceFactory')),
    __metadata("design:paramtypes", [machine_service_1.MachineService, Function])
], MonitorServiceManager);
//# sourceMappingURL=monitor-service-manager.service.js.map