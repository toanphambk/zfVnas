import { MachineService } from './machine.service';
import { Machine } from './entities/machine.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { NullableType } from 'src/utils/types/nullable.type';
export declare class MachineController {
    private readonly machineService;
    constructor(machineService: MachineService);
    create(createDto: CreateMachineDto): Promise<Machine>;
    findAll(): Promise<Machine[]>;
    findOne(id: string): Promise<NullableType<Machine>>;
    update(id: string, updateDto: UpdateMachineDto): Promise<Machine>;
    remove(id: string): Promise<void>;
}
