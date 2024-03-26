import { ConfigurationType } from 'src/plc-communication/interface/plc-communication.interface';
import { Machine } from 'src/machine/entities/machine.entity';
import { MonitorService } from '../monitor.service';
export type MonitorServiceFactory = (machine: Machine) => MonitorService;
export type MonitorDataType = 'barcodeFlag' | 'mesReadFlag' | 'rfidflag' | 'mesReadDone' | 'alarmFlag' | 'alarmCode' | 'connectionPulse';
export declare const monitorDataConfig: ConfigurationType<MonitorDataType>;
