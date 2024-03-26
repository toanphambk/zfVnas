import { NullableType } from 'src/utils/types/nullable.type';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';
import { ShiftService } from './shift.service';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    create(createDto: CreateShiftDto): Promise<Shift>;
    findAll(id?: number): Promise<Shift[]>;
    findOne(id: number): Promise<NullableType<Shift>>;
    update(id: number, updateDto: UpdateShiftDto): Promise<Shift>;
    remove(id: number): Promise<void>;
}
