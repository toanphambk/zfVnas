import { MonitorServiceManager } from 'src/monitor/monitor-service-manager.service';
import { Payload } from 'src/plc-communication/interface/plc-communication.interface';
export declare class MachineEventsService {
    private monitorServiceManager;
    constructor(monitorServiceManager: MonitorServiceManager);
    handleMachineDataChangeEvent({ key, val, machine }: Payload<any>): void;
}
