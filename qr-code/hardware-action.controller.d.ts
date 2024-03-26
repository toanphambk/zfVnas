import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { HardwareActionService } from './hardware-action.service';
import { Qrcode } from './entities/qrCode.entity';
import { CreateRFIDDto } from './dto/create-rfid.dto';
import { Rfid } from './entities/rfid.entity';
export declare class HardwareActionController {
    private readonly qrCodeService;
    constructor(qrCodeService: HardwareActionService);
    createQrCode(createDto: CreateQrCodeDto): Promise<Qrcode>;
    createRFID(createDto: CreateRFIDDto): Promise<Rfid>;
}
