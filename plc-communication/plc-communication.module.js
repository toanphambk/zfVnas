"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlcCommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const plc_communication_service_1 = require("./plc-communication.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let PlcCommunicationModule = exports.PlcCommunicationModule = class PlcCommunicationModule {
};
exports.PlcCommunicationModule = PlcCommunicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'PlcCommunicationServiceFactory',
                useFactory: (eventEmitter) => {
                    return (config) => new plc_communication_service_1.PlcCommunicationService(eventEmitter, config);
                },
                inject: [event_emitter_1.EventEmitter2],
            },
        ],
        exports: ['PlcCommunicationServiceFactory'],
    })
], PlcCommunicationModule);
//# sourceMappingURL=plc-communication.module.js.map