import { Machine } from 'src/machine/entities/machine.entity';
import { DeepPartial } from 'typeorm';
export declare class CreateShiftDto {
    shiftName: string;
    startTime: string;
    endTime: string;
    machine: DeepPartial<Machine>;
}
