import { Qrcode } from './entities/qrCode.entity';
import { PlcCommunicationServiceFactory } from 'src/plc-communication/interface/plc-communication.interface';
import { Repository } from 'typeorm';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { CreateRFIDDto } from './dto/create-rfid.dto';
import { Rfid } from './entities/rfid.entity';
export declare class HardwareActionService {
    private qrcodeRepository;
    private rfidRepository;
    private plcServiceFactory;
    constructor(qrcodeRepository: Repository<Qrcode>, rfidRepository: Repository<Rfid>, plcServiceFactory: PlcCommunicationServiceFactory<any>);
    createQrCode(createDto: CreateQrCodeDto): Promise<Qrcode>;
    createRFID(createDto: CreateRFIDDto): Promise<Rfid>;
}
