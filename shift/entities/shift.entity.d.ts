import { Machine } from 'src/machine/entities/machine.entity';
export declare class Shift {
    id: number;
    shiftName: string;
    startTime: string;
    endTime: string;
    machine: Machine;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
