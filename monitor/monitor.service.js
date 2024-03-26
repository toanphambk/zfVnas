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
exports.MonitorService = void 0;
const common_1 = require("@nestjs/common");
const mes_service_1 = require("../mes/mes.service");
const machine_entity_1 = require("../machine/entities/machine.entity");
const monitor_interface_1 = require("./interface/monitor.interface");
const console_1 = require("console");
let MonitorService = exports.MonitorService = class MonitorService {
    constructor(machine, plcServiceFactory, mesService) {
        this.machine = machine;
        this.plcServiceFactory = plcServiceFactory;
        this.mesService = mesService;
        void this.initPlcService();
    }
    async initPlcService() {
        try {
            const config = Object.assign(Object.assign({}, monitor_interface_1.monitorDataConfig), { machine: this.machine });
            this.plcMonitorConn = this.plcServiceFactory(config);
            await this.checkConnectionAndInitialize();
            await this.plcMonitorConn.addDataBlock();
            await this.plcMonitorConn.activeCycleScan();
            this.connectionPulseInterval = setInterval(() => {
                void this.connectionPulse();
            }, 1000);
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
    async checkConnectionAndInitialize() {
        await this.plcMonitorConn.initConnection();
        const { connection } = this.plcMonitorConn.getState();
        if (!connection) {
            await this.plcMonitorConn.connectionCleanUp();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await this.checkConnectionAndInitialize();
        }
    }
    async connectionPulse() {
        try {
            const { connection } = this.plcMonitorConn.getState();
            if (connection) {
                const { connectionPulse } = this.plcMonitorConn.getData();
                await this.plcMonitorConn.writeBlock(['connectionPulse'], [connectionPulse ? 0 : 1], false);
            }
        }
        catch (error) {
            (0, console_1.log)(error);
        }
    }
    getState() {
        return this.plcMonitorConn.getState();
    }
    async removeMonitor() {
        await this.plcMonitorConn.connectionCleanUp();
        this.connectionPulseInterval.unref();
    }
    async mesRequesHandler(machine) {
        try {
            await this.mesService.readMesDataExportXml(machine);
            await this.plcMonitorConn.writeBlock(['mesReadFlag'], [0]);
            await this.plcMonitorConn.writeBlock(['mesReadDone'], [0]);
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.MonitorService = MonitorService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PlcCommunicationServiceFactory')),
    __metadata("design:paramtypes", [machine_entity_1.Machine, Function, mes_service_1.MesService])
], MonitorService);
//# sourceMappingURL=monitor.service.js.map