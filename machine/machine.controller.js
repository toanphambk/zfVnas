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
exports.MachineController = void 0;
const common_1 = require("@nestjs/common");
const machine_service_1 = require("./machine.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const machine_entity_1 = require("./entities/machine.entity");
const create_machine_dto_1 = require("./dto/create-machine.dto");
const update_machine_dto_1 = require("./dto/update-machine.dto");
let MachineController = exports.MachineController = class MachineController {
    constructor(machineService) {
        this.machineService = machineService;
    }
    create(createDto) {
        return this.machineService.create(createDto);
    }
    findAll() {
        return this.machineService.findAll();
    }
    findOne(id) {
        return this.machineService.findOne({ id: +id });
    }
    update(id, updateDto) {
        return this.machineService.update(+id, updateDto);
    }
    remove(id) {
        return this.machineService.remove({ id: +id });
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The machine has been successfully created.',
        type: machine_entity_1.Machine,
    }),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_machine_dto_1.CreateMachineDto]),
    __metadata("design:returntype", Promise)
], MachineController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Array of machines retrieved successfully.',
        type: [machine_entity_1.Machine],
    }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachineController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Single machine retrieved successfully.',
        type: machine_entity_1.Machine,
    }),
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin, roles_enum_1.RoleEnum.user),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachineController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The machine has been successfully updated.',
        type: machine_entity_1.Machine,
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_machine_dto_1.UpdateMachineDto]),
    __metadata("design:returntype", Promise)
], MachineController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The machine has been successfully removed.',
    }),
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachineController.prototype, "remove", null);
exports.MachineController = MachineController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Machine'),
    (0, common_1.Controller)('machine'),
    __metadata("design:paramtypes", [machine_service_1.MachineService])
], MachineController);
//# sourceMappingURL=machine.controller.js.map