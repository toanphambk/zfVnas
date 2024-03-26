import { Machine } from 'src/machine/entities/machine.entity';
export declare class Qrcode {
    id: number;
    code: string;
    machine: Machine;
    createdAt: Date;
}
