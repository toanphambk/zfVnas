import { MesService } from './mes.service';
import { Record } from './entity/record.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindAllRecordByMachineAndDateTimeDto } from './dto/findAllRecordByMachineAndDateTime.dto';
import { GetDailyLineChartDataDto } from './dto/getDailyLineChartData.dto';
export declare class MesController {
    private readonly mesService;
    constructor(mesService: MesService);
    findAllRecord(): Promise<Record[]>;
    findAllRecordByMachineAndDateTime(query: FindAllRecordByMachineAndDateTimeDto): Promise<Record[]>;
    getDailyLineChartData(query: GetDailyLineChartDataDto): Promise<{
        Hour: number;
        Actual: number;
    }[]>;
    findOneRecord(moduleSerialNo: string): Promise<NullableType<Record>>;
}
