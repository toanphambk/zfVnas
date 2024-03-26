import { ConfigurationType } from 'src/plc-communication/interface/plc-communication.interface';
export type QrCodeDataType = 'barcodeData' | 'barcodeFlag';
export type RfidDataType = 'rfidData' | 'rfidflag';
export declare const qrCodeConfiguration: ConfigurationType<QrCodeDataType>;
export declare const rfidConfiguration: ConfigurationType<RfidDataType>;
