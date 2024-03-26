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
exports.ShiftService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shift_entity_1 = require("./entities/shift.entity");
let ShiftService = exports.ShiftService = class ShiftService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDto) {
        if (!(await this.isTimeOverlap(createDto))) {
            const shift = this.repo.create(createDto);
            return this.repo.save(shift);
        }
        throw new common_1.BadRequestException('Shift Overlapse');
    }
    findAll(machineId) {
        if (machineId) {
            return this.repo.find({
                where: { machine: { id: machineId } },
            });
        }
        else {
            return this.repo.find({
                relations: ['machine'],
            });
        }
    }
    async findOne(fields) {
        const shift = await this.repo.findOne({ where: fields });
        if (!shift) {
            throw new common_1.NotFoundException('machine setting not found');
        }
        return shift;
    }
    async update(id, updateDto) {
        const existingShift = await this.findOne({ id: +id });
        if (!existingShift) {
            throw new common_1.NotFoundException('Setting not found');
        }
        Object.assign(existingShift, updateDto);
        return this.repo.save(existingShift);
    }
    async remove(fields) {
        const found = await this.repo.findOne({
            where: fields,
        });
        if (!found) {
            throw new common_1.NotFoundException('Shift not found');
        }
        await this.repo.softRemove(found);
    }
    async isTimeOverlap(createDto) {
        const shifts = await this.findAll(createDto.machine.id);
        for (const shift of shifts) {
            const createStartTimeMinutes = this._getTimeInMinutes(createDto.startTime);
            const createEndTimeMinutes = this._getTimeInMinutes(createDto.endTime);
            const shiftStartTimeMinutes = this._getTimeInMinutes(shift.startTime);
            const shiftEndTimeMinutes = this._getTimeInMinutes(shift.endTime);
            if (createStartTimeMinutes < shiftEndTimeMinutes &&
                createEndTimeMinutes > shiftStartTimeMinutes) {
                return true;
            }
        }
        return false;
    }
    _getTimeInMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }
};
exports.ShiftService = ShiftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shift_entity_1.Shift)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShiftService);
//# sourceMappingURL=shift.service.js.map