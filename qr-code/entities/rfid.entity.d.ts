import { Machine } from 'src/machine/entities/machine.entity';
export declare class Rfid {
    id: number;
    rfidTag: string;
    machine: Machine;
    createdAt: Date;
}
