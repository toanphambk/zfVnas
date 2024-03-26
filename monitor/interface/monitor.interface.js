"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorDataConfig = void 0;
exports.monitorDataConfig = {
    blockSetting: {
        barcodeFlag: {
            address: 'DB47,INT0.1',
            type: 'READ_WRITE',
        },
        mesReadFlag: {
            address: 'DB46,INT0.1',
            type: 'READ_WRITE',
        },
        rfidflag: {
            address: 'DB50,INT0.1',
            type: 'READ_WRITE',
        },
        mesReadDone: {
            address: 'DB46,INT10.1',
            type: 'READ_WRITE',
        },
        alarmFlag: {
            address: 'DB48,INT0.1',
            type: 'READ_WRITE',
        },
        alarmCode: {
            address: 'DB46,INT2.1',
            type: 'READ_ONLY',
        },
        connectionPulse: {
            address: 'DB46,INT12.1',
            type: 'READ_WRITE',
        },
    },
};
//# sourceMappingURL=monitor.interface.js.map