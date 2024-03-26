import { Shift } from 'src/shift/entities/shift.entity';
import { MachineEvent } from 'src/monitor/entities/machineEvent.entity';
import { Qrcode } from 'src/qr-code/entities/qrCode.entity';
import { Rfid } from 'src/qr-code/entities/rfid.entity';
import { Record } from 'src/mes/entity/record.entity';
export declare class Machine {
    id: number;
    systemID: string;
    lineID: string;
    stationName: string;
    stationID: string;
    description: string;
    ip: string;
    shifts: Shift[];
    records: Record[];
    qrcodes: Qrcode[];
    rfids: Rfid[];
    machineEvents: MachineEvent[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
