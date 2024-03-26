import { Repository } from 'typeorm';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MachineService {
    private repo;
    private machineServiceEvent;
    constructor(repo: Repository<Machine>, machineServiceEvent: EventEmitter2);
    create(createDto: CreateMachineDto): Promise<Machine>;
    findAll(): Promise<Machine[]>;
    findOne(fields: EntityCondition<Machine>): Promise<NullableType<Machine>>;
    update(id: number, updateDto: UpdateMachineDto): Promise<Machine>;
    remove(fields: EntityCondition<Machine>): Promise<void>;
}
