import { Machine } from 'src/machine/entities/machine.entity';
export declare class MachineEvent {
    id: number;
    eventName: string;
    machine: Machine;
    createdAt: Date;
    deletedAt: Date;
}
