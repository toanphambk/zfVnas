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
exports.MonitorServiceManagerController = void 0;
const common_1 = require("@nestjs/common");
const monitor_service_manager_service_1 = require("./monitor-service-manager.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
let MonitorServiceManagerController = exports.MonitorServiceManagerController = class MonitorServiceManagerController {
    constructor(monitorServiceManager) {
        this.monitorServiceManager = monitorServiceManager;
    }
    getMachineState(machineId) {
        return this.monitorServiceManager.getMonitorServiceState(machineId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiQuery)({
        name: 'machineId',
        description: 'Filter record by machine ID',
        type: Number,
        required: true,
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of shifts.',
    }),
    __param(0, (0, common_1.Query)('machineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MonitorServiceManagerController.prototype, "getMachineState", null);
exports.MonitorServiceManagerController = MonitorServiceManagerController = __decorate([
    (0, common_1.Controller)('monitor'),
    __metadata("design:paramtypes", [monitor_service_manager_service_1.MonitorServiceManager])
], MonitorServiceManagerController);
//# sourceMappingURL=monitor-service-manager.controller.js.map