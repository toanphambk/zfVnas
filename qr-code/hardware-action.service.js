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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareActionService = void 0;
const common_1 = require("@nestjs/common");
const qrCode_entity_1 = require("./entities/qrCode.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const hardware_action_interface_1 = require("./interface/hardware-action.interface");
const rfid_entity_1 = require("./entities/rfid.entity");
let HardwareActionService = exports.HardwareActionService = class HardwareActionService {
    constructor(qrcodeRepository, rfidRepository, plcServiceFactory) {
        this.qrcodeRepository = qrcodeRepository;
        this.rfidRepository = rfidRepository;
        this.plcServiceFactory = plcServiceFactory;
    }
    async createQrCode(createDto) {
        let qrCodeConn = {};
        try {
            const { machine } = createDto;
            const config = Object.assign(Object.assign({}, hardware_action_interface_1.qrCodeConfiguration), { machine });
            qrCodeConn = this.plcServiceFactory(config);
            await qrCodeConn.initConnection();
            const { connection } = qrCodeConn.getState();
            if (!connection) {
                throw new common_1.InternalServerErrorException('CONNECTION ERROR');
            }
            await qrCodeConn.addDataBlock();
            void qrCodeConn.activeCycleScan();
            await qrCodeConn.writeBlock(['barcodeData', 'barcodeFlag'], [createDto.code, 1]);
            qrCodeConn.deactiveCycleScan();
            const qrCode = this.qrcodeRepository.create(createDto);
            return this.qrcodeRepository.save(qrCode);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('write qrcode error', error);
        }
        finally {
            await qrCodeConn.connectionCleanUp();
        }
    }
    async createRFID(createDto) {
        let rfidDataConn = {};
        try {
            const { machine } = createDto;
            const config = Object.assign(Object.assign({}, hardware_action_interface_1.rfidConfiguration), { machine });
            rfidDataConn = this.plcServiceFactory(config);
            await rfidDataConn.initConnection();
            const { connection } = rfidDataConn.getState();
            if (!connection) {
                throw new common_1.InternalServerErrorException('CONNECTION ERROR');
            }
            void rfidDataConn.activeCycleScan();
            await rfidDataConn.addDataBlock();
            await rfidDataConn.writeBlock(['rfidData', 'rfidflag'], [createDto.code, 1]);
            const rfid = this.rfidRepository.create(createDto);
            return this.rfidRepository.save(rfid);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('write to plc error');
        }
        finally {
            await rfidDataConn.connectionCleanUp();
        }
    }
};
exports.HardwareActionService = HardwareActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(qrCode_entity_1.Qrcode)),
    __param(1, (0, typeorm_2.InjectRepository)(rfid_entity_1.Rfid)),
    __param(2, (0, common_1.Inject)('PlcCommunicationServiceFactory')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository, Function])
], HardwareActionService);
//# sourceMappingURL=hardware-action.service.js.map