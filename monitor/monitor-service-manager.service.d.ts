import { MonitorService } from 'src/monitor/monitor.service';
import { Machine } from 'src/machine/entities/machine.entity';
import { MachineService } from 'src/machine/machine.service';
import { MonitorServiceFactory } from './interface/monitor.interface';
export declare class MonitorServiceManager {
    private machineService;
    private monitorServiceFactory;
    private monitorServiceInstances;
    constructor(machineService: MachineService, monitorServiceFactory: MonitorServiceFactory);
    getAllMonitorServices(): MonitorService[];
    private createAllMonitorServices;
    private createMonitorService;
    private updateMonitorService;
    private deleteMonitorService;
    getMonitorService(machine: Machine): MonitorService;
    getMonitorServicebyMachineID(machineId: any): MonitorService;
    getMonitorServiceState(machineId: number): {
        state: import("../plc-communication/interface/plc-communication.interface").PlcComStateType;
        connection: boolean;
        cycleScanIsActive: boolean;
        config: import("../plc-communication/interface/plc-communication.interface").ConfigurationType<import("./interface/monitor.interface").MonitorDataType>;
        addressList: import("../plc-communication/interface/plc-communication.interface").PlcAddresslistType;
    };
    handleMachineCreate(event: Machine): void;
    handleMachineUpdate(event: Machine): void;
    handleMachineDelete(event: Machine): void;
}
