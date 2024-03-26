import { MesService } from 'src/mes/mes.service';
import { Machine } from 'src/machine/entities/machine.entity';
import { MonitorDataType } from './interface/monitor.interface';
import { PlcCommunicationServiceFactory } from 'src/plc-communication/interface/plc-communication.interface';
export declare class MonitorService {
    private machine;
    private plcServiceFactory;
    private mesService;
    constructor(machine: Machine, plcServiceFactory: PlcCommunicationServiceFactory<any>, mesService: MesService);
    private plcMonitorConn;
    private connectionPulseInterval;
    private initPlcService;
    private checkConnectionAndInitialize;
    connectionPulse(): Promise<void>;
    getState(): {
        state: import("src/plc-communication/interface/plc-communication.interface").PlcComStateType;
        connection: boolean;
        cycleScanIsActive: boolean;
        config: import("src/plc-communication/interface/plc-communication.interface").ConfigurationType<MonitorDataType>;
        addressList: import("src/plc-communication/interface/plc-communication.interface").PlcAddresslistType;
    };
    removeMonitor(): Promise<void>;
    mesRequesHandler(machine: Machine): Promise<void>;
}
