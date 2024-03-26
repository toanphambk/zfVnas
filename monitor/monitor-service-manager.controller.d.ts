import { MonitorServiceManager } from './monitor-service-manager.service';
export declare class MonitorServiceManagerController {
    private readonly monitorServiceManager;
    constructor(monitorServiceManager: MonitorServiceManager);
    getMachineState(machineId: number): {
        state: import("../plc-communication/interface/plc-communication.interface").PlcComStateType;
        connection: boolean;
        cycleScanIsActive: boolean;
        config: import("../plc-communication/interface/plc-communication.interface").ConfigurationType<import("./interface/monitor.interface").MonitorDataType>;
        addressList: import("../plc-communication/interface/plc-communication.interface").PlcAddresslistType;
    };
}
