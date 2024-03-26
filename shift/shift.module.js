"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftModule = void 0;
const common_1 = require("@nestjs/common");
const shift_service_1 = require("./shift.service");
const shift_controller_1 = require("./shift.controller");
const typeorm_1 = require("@nestjs/typeorm");
const is_exists_validator_1 = require("../utils/validators/is-exists.validator");
const is_not_exists_validator_1 = require("../utils/validators/is-not-exists.validator");
const is_record_exist_validator_1 = require("../utils/validators/is-record-exist.validator");
const shift_entity_1 = require("./entities/shift.entity");
let ShiftModule = exports.ShiftModule = class ShiftModule {
};
exports.ShiftModule = ShiftModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([shift_entity_1.Shift])],
        controllers: [shift_controller_1.ShiftController],
        providers: [is_exists_validator_1.IsExist, is_not_exists_validator_1.IsNotExist, is_record_exist_validator_1.IsRecordExist, shift_service_1.ShiftService],
        exports: [shift_service_1.ShiftService],
    })
], ShiftModule);
//# sourceMappingURL=shift.module.js.map