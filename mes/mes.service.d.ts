import { PlcCommunicationServiceFactory, PlcDataType } from 'src/plc-communication/interface/plc-communication.interface';
import { RecordDataType } from './interface/mes.interface';
import { Machine } from 'src/machine/entities/machine.entity';
import { Repository } from 'typeorm';
import { RecordData } from './entity/recordData.entity';
import { Record } from './entity/record.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { FindAllRecordByMachineAndDateTimeDto } from './dto/findAllRecordByMachineAndDateTime.dto';
import { GetDailyLineChartDataDto } from './dto/getDailyLineChartData.dto';
export declare class MesService {
    private plcServiceFactory;
    private recordRepo;
    private recordDataRepo;
    constructor(plcServiceFactory: PlcCommunicationServiceFactory<any>, recordRepo: Repository<Record>, recordDataRepo: Repository<RecordData>);
    private XML_SAVE_DIR;
    readMesDataExportXml(machine: Machine): Promise<boolean>;
    getAllRecords(): Promise<Record[]>;
    getDailyLineChartData({ machineId, time, }: GetDailyLineChartDataDto): Promise<{
        Hour: number;
        Actual: number;
    }[]>;
    getAllRecordsByMachineAndTime({ machineId, startTime, endTime, }: FindAllRecordByMachineAndDateTimeDto): Promise<Record[]>;
    getOneRecord(fields: EntityCondition<Record>): Promise<NullableType<Record>>;
    private getRecordInfo;
    getRecordData(machine: Machine): Promise<{
        data: PlcDataType<RecordDataType>[];
    }>;
    private initAndGetData;
    private formatDataForXml;
    private generateElementConfig;
}
