import { Machine } from 'src/machine/entities/machine.entity';
import { RecordData } from './recordData.entity';
export declare class Record {
    id: number;
    moduleSerialNo: string;
    systemDt: string;
    result: number;
    machine: Machine;
    recordDatas: RecordData[];
    createdAt: Date;
}
