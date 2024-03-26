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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlcCommunicationService = void 0;
const common_1 = require("@nestjs/common");
const nodes7 = require("nodes7");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("events");
const uuid_1 = require("uuid");
let PlcCommunicationService = exports.PlcCommunicationService = class PlcCommunicationService {
    constructor(plcCommunicationServiceEvent, config) {
        this.plcCommunicationServiceEvent = plcCommunicationServiceEvent;
        this.config = config;
        this.s7Connection = new nodes7({ silent: true });
        this.state = 'BOOT_UP';
        this.cycleScanIsActive = false;
        this.data = {};
        this.plcWriteQueue = [];
        this.plcEvent = new events_1.EventEmitter();
        this.addDataBlock = async () => {
            if (this.state == 'ERROR') {
                throw new Error('Plc Communication Service Is Not Ready');
            }
            this.state = 'INIT';
            this.s7Connection.removeItems();
            this.addressList = { read: [], write: [] };
            Object.entries(this.config.blockSetting).forEach(([key, blockSetting]) => {
                const setting = blockSetting;
                if (['READ_ONLY', 'READ_WRITE'].includes(setting.type)) {
                    this.addressList.read.push({
                        name: key,
                        address: setting.address,
                    });
                }
                if (['WRITE_ONLY', 'READ_WRITE'].includes(setting.type)) {
                    this.addressList.write.push({
                        name: key,
                        address: setting.address,
                    });
                }
            });
            const readingAdressList = this.addressList.read.map((block) => block.address);
            this.s7Connection.addItems(readingAdressList);
            await new Promise((res) => setTimeout(res, 10));
            await this.dataUpdate();
            return true;
        };
        this.cycleScan = async () => {
            if (this.cycleScanIsActive) {
                try {
                    if (this.state != 'READY') {
                        console.log('[ PLC Service ]: PLC Service Is Not Ready');
                        this.plcWriteQueue = [];
                        await new Promise((res) => setTimeout(res, 1000));
                        void this.cycleScan();
                        return;
                    }
                    if (this.plcWriteQueue.length > 10) {
                        this.errorHandler('QUEUE OVERFLOW', false, this.plcWriteQueue);
                        return;
                    }
                    if (this.plcWriteQueue.length > 0) {
                        await new Promise((res, rej) => {
                            const command = this.plcWriteQueue[0];
                            this.s7Connection.writeItems(command.blockName, command.data, (err) => {
                                if (err) {
                                    rej(this.errorHandler(`WRITE TO PLC ERROR : `, false, command));
                                    return;
                                }
                                this.plcWriteQueue.shift();
                                this.plcEvent.emit(command.uuid, undefined);
                                res();
                            });
                        });
                    }
                    await this.dataUpdate();
                    void this.cycleScan();
                }
                catch (error) {
                    this.errorHandler('CYCLE SCAN ERROR: ' + error, false);
                }
            }
        };
        this.dataUpdate = async () => {
            try {
                const dataFromPLC = await this.readFromPlc();
                Object.keys(dataFromPLC).map((address) => {
                    const found = this.addressList.read.find((block) => block.address === address);
                    if (found) {
                        this.data[found.name] = dataFromPLC[address];
                        return;
                    }
                    throw new Error('Address not found in read array');
                });
                this.state = 'READY';
            }
            catch (error) {
                void this.errorHandler('READ FROM PLC ERROR', true, error);
            }
        };
        this.writeBlock = (blockName, data, log = true) => {
            return new Promise((res, rej) => {
                if (this.state !== 'READY') {
                    console.log(blockName, data, this.state);
                    rej('PLC is not ready');
                    return;
                }
                const { isValid, blockAddress } = this.blockAdressParse(blockName);
                if (!isValid) {
                    rej('DATA BLOCK IS NOT VALID');
                    return;
                }
                const uuid = (0, uuid_1.v4)();
                this.plcWriteQueue.push({
                    blockName: blockAddress,
                    data: data,
                    uuid,
                });
                this.plcEvent.once(uuid, (err) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    if (log)
                        console.log(`[ WRITE TO PLC DONE] : [ ${blockName} ] =[ ${data} ]`);
                    res(true);
                    return;
                });
            });
        };
        this.readFromPlc = () => {
            return new Promise((res, rej) => {
                this.s7Connection.readAllItems((err, data) => {
                    if (err) {
                        rej({ error: err, plcData: data });
                        return;
                    }
                    res(data);
                });
            });
        };
        this.dataChangeHandler = () => {
            return {
                set: (target, key, val) => {
                    const oldVal = target[key];
                    if (oldVal != val) {
                        target[key] = val;
                        const payload = {
                            machine: this.config.machine,
                            data: this.data,
                            key,
                            oldVal,
                            val,
                        };
                        this.plcCommunicationServiceEvent.emit('machine.data.change', payload);
                        return true;
                    }
                    return true;
                },
                get: (target, key) => {
                    if (typeof target[key] === 'object' && target[key] !== null) {
                        return new Proxy(target[key], this.dataChangeHandler());
                    }
                    return target[key];
                },
            };
        };
        this.errorHandler = (err, isOperational, data) => {
            console.log(`[ ERROR ] :  ${err} : ${data ? JSON.stringify(data) : ''}`);
            this.state = 'ERROR';
            if (!isOperational) {
                return;
            }
            switch (err) {
                case 'READ FROM PLC ERROR':
                    const isBadReading = Object.values(data.plcData).find((val) => typeof val == 'string' && val.includes('BAD'));
                    if (isBadReading && this.cycleScanIsActive) {
                        setTimeout(() => {
                            void this.dataUpdate();
                        }, 500);
                    }
                    break;
            }
            return;
        };
        this.blockAdressParse = (blocksName) => {
            let isValid = true;
            const blockAddress = [];
            blocksName.forEach((blockName) => {
                const foundBlock = this.addressList.write.find((writeBlock) => writeBlock.name === blockName);
                if (!foundBlock) {
                    console.log(`[ ERROR ]: Can not find valid address ${JSON.stringify(blockName)}`);
                    isValid = false;
                    return;
                }
                blockAddress.push(foundBlock.address);
            });
            return { isValid, blockAddress };
        };
        this.data = new Proxy(this.data, this.dataChangeHandler());
        this.setConfig(this.config);
    }
    setConfig(config) {
        this.config = Object.assign({}, config);
    }
    getData() {
        return Object.assign({}, this.data);
    }
    resetData() {
        if (this.cycleScanIsActive) {
            return false;
        }
        this.data = {};
        return true;
    }
    removeListeners() {
        this.plcEvent.removeAllListeners();
    }
    getState() {
        const { value } = this.s7Connection.findItem('_COMMERR');
        return {
            state: this.state,
            connection: !value,
            cycleScanIsActive: this.cycleScanIsActive,
            config: this.config,
            addressList: this.addressList,
        };
    }
    async initConnection() {
        this.state = 'INIT';
        try {
            await this.establishConnection();
            return true;
        }
        catch (err) {
            this.errorHandler('INTI CONNECTION ERROR', true, err);
            return false;
        }
    }
    establishConnection() {
        return new Promise((resolve, reject) => {
            this.s7Connection.initiateConnection({
                host: this.config.machine.ip,
                port: 102,
                rack: 0,
                slot: 1,
            }, (err) => (err ? reject(err) : resolve()));
        });
    }
    async dropConnection() {
        const { connection } = this.getState();
        if (connection) {
            await new Promise((res) => {
                this.s7Connection.dropConnection(() => {
                    res();
                });
            });
        }
    }
    async connectionCleanUp() {
        this.deactiveCycleScan();
        await this.dropConnection();
        this.resetData();
        this.removeListeners();
    }
    removeBlock() {
        this.s7Connection.removeItems();
    }
    async activeCycleScan() {
        this.cycleScanIsActive = true;
        await this.cycleScan();
    }
    deactiveCycleScan() {
        this.cycleScanIsActive = false;
        this.plcWriteQueue = [];
    }
};
exports.PlcCommunicationService = PlcCommunicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2, Object])
], PlcCommunicationService);
//# sourceMappingURL=plc-communication.service.js.map