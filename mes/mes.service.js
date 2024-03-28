"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MesService = void 0;
const common_1 = require("@nestjs/common");
const xml2js = require("xml2js");
const mes_interface_1 = require("./interface/mes.interface");
const fs_1 = require("fs");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recordData_entity_1 = require("./entity/recordData.entity");
const record_entity_1 = require("./entity/record.entity");
const XML_SAVE_DIR = (_a = process.env.XML_SAVE_DIR) !== null && _a !== void 0 ? _a : './';
let MesService = exports.MesService = class MesService {
    constructor(plcServiceFactory, recordRepo, recordDataRepo) {
        this.plcServiceFactory = plcServiceFactory;
        this.recordRepo = recordRepo;
        this.recordDataRepo = recordDataRepo;
        this.builder = new xml2js.Builder({ headless: true, rootName: 'Data' });
    }
    async readMesDataExportXml(machine) {
        try {
            const { fileName, data: recordInfo } = await this.getRecordInfo(machine);
            const { data: recordData } = await this.getRecordData(machine);
            let xmlData = '<Data\n';
            xmlData += this.formatDataForXml(`QD.HDR`, recordInfo.lineInfo) + '\n';
            xmlData +=
                this.formatDataForXml(`QD.HDR`, recordInfo.stationInfo) +
                    ' DBType="QUALITY"\n';
            recordData.forEach((data, index) => {
                xmlData += this.formatDataForXml(`QD.DT0${index + 1}`, data) + '\n';
            });
            xmlData += '/>';
            const newRecord = await this.recordRepo.save({
                moduleSerialNo: recordInfo.lineInfo.ModuleSerialNo,
                systemDt: recordInfo.lineInfo.SystemDT,
                machine: machine,
            });
            recordData.forEach(async (data, index) => {
                await this.recordDataRepo.save(Object.assign(Object.assign({}, recordData[index]), { record: newRecord }));
            });
            if (!(0, fs_1.existsSync)(XML_SAVE_DIR)) {
                (0, fs_1.mkdirSync)(XML_SAVE_DIR, { recursive: true });
            }
            const filePath = (0, path_1.join)(XML_SAVE_DIR, fileName);
            (0, fs_1.writeFileSync)(filePath, xmlData);
            return true;
        }
        catch (error) {
            throw new Error(`Read Mes Data Error: ${error.message}`);
        }
    }
    async getAllRecords() {
        return this.recordRepo.find({ relations: ['recordDatas', 'machine'] });
    }
    async getDailyLineChartData({ machineId, time, }) {
        const dayStart = new Date(time);
        const dayEnd = new Date(time);
        dayStart.setHours(0, 0, 0, 0);
        dayEnd.setHours(23, 59, 59, 999);
        const recordCountEachHour = Array.from({ length: 24 }, (_, index) => {
            return {
                Hour: index,
                Actual: 0,
            };
        });
        const records = await this.recordRepo.find({
            where: {
                machine: { id: machineId },
                createdAt: (0, typeorm_2.Between)(dayStart, dayEnd),
            },
        });
        records.forEach((record) => {
            const hour = record.createdAt.getHours();
            recordCountEachHour[hour].Actual++;
            recordCountEachHour[hour].Hour = hour;
        });
        return recordCountEachHour;
    }
    async getAllRecordsByMachineAndTime({ machineId, startTime, endTime, }) {
        try {
            const conditions = {
                machine: { id: machineId },
            };
            if (startTime && endTime) {
                const start = new Date(startTime);
                const end = new Date(endTime);
                conditions.createdAt = (0, typeorm_2.Between)(start, end);
            }
            else if (startTime) {
                const start = new Date(startTime);
                const end = new Date(start);
                end.setHours(23, 59, 59, 999);
                conditions.createdAt = (0, typeorm_2.Between)(start, end);
            }
            else if (endTime) {
                const end = new Date(endTime);
                const start = new Date(end);
                start.setHours(0, 0, 0, 0);
                conditions.createdAt = (0, typeorm_2.Between)(start, end);
            }
            return this.recordRepo.find({
                where: conditions,
                relations: ['recordDatas', 'machine'],
            });
        }
        catch (error) {
            throw new Error('Error in getAllRecordsByMachineAndTimeRange');
        }
    }
    async getOneRecord(fields) {
        const record = await this.recordRepo.findOne({
            where: fields,
            relations: ['recordDatas'],
        });
        if (!record) {
            throw new common_1.NotFoundException('record not found');
        }
        return record;
    }
    async getRecordInfo(machine) {
        let recordInfoConn = {};
        try {
            const config = Object.assign(Object.assign({}, mes_interface_1.recordInfoConfig), { machine });
            recordInfoConn = this.plcServiceFactory(config);
            await recordInfoConn.initConnection();
            const { connection } = recordInfoConn.getState();
            if (!connection) {
                throw new common_1.InternalServerErrorException('CONNECTION ERROR');
            }
            await recordInfoConn.addDataBlock();
            const { SystemDT, ModuleSerialNo } = recordInfoConn.getData();
            const data = {
                lineInfo: {
                    SystemID: machine.systemID,
                    SystemDT,
                    ModuleSerialNo,
                },
                stationInfo: {
                    LineID: machine.lineID,
                    StationName: machine.stationName,
                    StationID: machine.stationID,
                    PartID: '0',
                    Mode: '0',
                },
            };
            const fileName = `${machine.stationName}_${ModuleSerialNo}_${SystemDT}.xml`;
            return { fileName, data };
        }
        catch (error) {
            throw new Error('Error in getRecordInfo');
        }
        finally {
            await recordInfoConn.connectionCleanUp();
        }
    }
    async getRecordData(machine) {
        const config = Object.assign(Object.assign({}, mes_interface_1.recordDataConfig), { machine });
        const data = [];
        for (let i = 0; i < 4; i++) {
            try {
                const result = await this.initAndGetData(config, i);
                data.push(result);
            }
            catch (error) {
                console.error(`Error in connection ${i}: ${error.message}`);
                throw new Error(`Error in connection ${i}: ${error.message}`);
            }
        }
        return { data };
    }
    async initAndGetData(recordDataConfig, index) {
        let recordDataConn = {};
        try {
            const config = Object.assign(Object.assign({}, recordDataConfig), { blockSetting: this.generateElementConfig(index) });
            recordDataConn = this.plcServiceFactory(config);
            await recordDataConn.initConnection();
            const { connection } = recordDataConn.getState();
            if (!connection) {
                throw new Error(`CONNECTION ERROR at index ${index}`);
            }
            await recordDataConn.addDataBlock();
            return recordDataConn.getData();
        }
        catch (error) {
            throw new Error(`Error in connection ${index}: ${error.message}`);
        }
        finally {
            await recordDataConn.connectionCleanUp();
        }
    }
    formatDataForXml(prefix, data) {
        return Object.entries(data)
            .map(([key, value]) => {
            return `${prefix}.${key.replace('_', '.')}="${value}"`;
        })
            .join(' ');
    }
    generateElementConfig(i) {
        const baseOffset = 102;
        const elementSize = 158;
        const startOffset = baseOffset + i * elementSize;
        return {
            OPID: {
                address: `DB46,S${startOffset}.5`,
                type: 'READ_ONLY',
            },
            CurDta_QD01: {
                address: `DB46,INT${startOffset + 8}.1`,
                type: 'READ_ONLY',
            },
            CurDta_QD02: {
                address: `DB46,INT${startOffset + 10}.1`,
                type: 'READ_ONLY',
            },
            CurDta_QD03: {
                address: `DB46,INT${startOffset + 12}.1`,
                type: 'READ_ONLY',
            },
            CurDta_QD04: {
                address: `DB46,INT${startOffset + 14}.1`,
                type: 'READ_ONLY',
            },
            PrvDta1_QD01: {
                address: `DB46,INT${startOffset + 16}.1`,
                type: 'READ_ONLY',
            },
            PrvDta1_QD02: {
                address: `DB46,INT${startOffset + 18}.1`,
                type: 'READ_ONLY',
            },
            PrvDta1_QD03: {
                address: `DB46,INT${startOffset + 20}.1`,
                type: 'READ_ONLY',
            },
            PrvDta1_QD04: {
                address: `DB46,INT${startOffset + 22}.1`,
                type: 'READ_ONLY',
            },
            PrvDta2_QD01: {
                address: `DB46,INT${startOffset + 24}.1`,
                type: 'READ_ONLY',
            },
            PrvDta2_QD02: {
                address: `DB46,INT${startOffset + 26}.1`,
                type: 'READ_ONLY',
            },
            PrvDta2_QD03: {
                address: `DB46,INT${startOffset + 28}.1`,
                type: 'READ_ONLY',
            },
            PrvDta2_QD04: {
                address: `DB46,INT${startOffset + 30}.1`,
                type: 'READ_ONLY',
            },
            TryCnt: {
                address: `DB46,INT${startOffset + 32}.1`,
                type: 'READ_ONLY',
            },
            RT: {
                address: `DB46,INT${startOffset + 34}.1`,
                type: 'READ_ONLY',
            },
            OType: {
                address: `DB46,INT${startOffset + 36}.1`,
                type: 'READ_ONLY',
            },
            QD01_Min: {
                address: `DB46,INT${startOffset + 38}.1`,
                type: 'READ_ONLY',
            },
            QD01_Max: {
                address: `DB46,INT${startOffset + 40}.1`,
                type: 'READ_ONLY',
            },
            QD02_Min: {
                address: `DB46,INT${startOffset + 42}.1`,
                type: 'READ_ONLY',
            },
            QD02_Max: {
                address: `DB46,INT${startOffset + 44}.1`,
                type: 'READ_ONLY',
            },
            QD03_Min: {
                address: `DB46,INT${startOffset + 46}.1`,
                type: 'READ_ONLY',
            },
            QD03_Max: {
                address: `DB46,INT${startOffset + 48}.1`,
                type: 'READ_ONLY',
            },
            QD04_Min: {
                address: `DB46,INT${startOffset + 50}.1`,
                type: 'READ_ONLY',
            },
            QD04_Max: {
                address: `DB46,INT${startOffset + 52}.1`,
                type: 'READ_ONLY',
            },
            OperatorName: {
                address: `DB46,S${startOffset + 54}.40`,
                type: 'READ_ONLY',
            },
            OPTxt: {
                address: `DB46,S${startOffset + 96}.60`,
                type: 'READ_ONLY',
            },
        };
    }
};
exports.MesService = MesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PlcCommunicationServiceFactory')),
    __param(1, (0, typeorm_1.InjectRepository)(record_entity_1.Record)),
    __param(2, (0, typeorm_1.InjectRepository)(recordData_entity_1.RecordData)),
    __metadata("design:paramtypes", [Function, typeorm_2.Repository,
        typeorm_2.Repository])
], MesService);
//# sourceMappingURL=mes.service.js.map