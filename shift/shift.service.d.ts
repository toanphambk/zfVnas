import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './entities/shift.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftService {
    private repo;
    constructor(repo: Repository<Shift>);
    create(createDto: CreateShiftDto): Promise<Shift>;
    findAll(machineId?: number): Promise<Shift[]>;
    findOne(fields: EntityCondition<Shift>): Promise<NullableType<Shift>>;
    update(id: number, updateDto: UpdateShiftDto): Promise<Shift>;
    remove(fields: EntityCondition<Shift>): Promise<void>;
    isTimeOverlap(createDto: CreateShiftDto): Promise<boolean>;
    private _getTimeInMinutes;
}
