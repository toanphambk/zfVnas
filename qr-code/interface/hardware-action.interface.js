"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rfidConfiguration = exports.qrCodeConfiguration = void 0;
exports.qrCodeConfiguration = {
    blockSetting: {
        barcodeData: {
            address: 'DB47,S2.40',
            type: 'WRITE_ONLY',
        },
        barcodeFlag: {
            address: 'DB47,INT0.1',
            type: 'READ_WRITE',
        },
    },
};
exports.rfidConfiguration = {
    blockSetting: {
        rfidData: {
            address: 'DB50,S2.40',
            type: 'WRITE_ONLY',
        },
        rfidflag: {
            address: 'DB50,INT0.1',
            type: 'READ_WRITE',
        },
    },
};
//# sourceMappingURL=hardware-action.interface.js.map