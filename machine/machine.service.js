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
exports.MachineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const machine_entity_1 = require("./entities/machine.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let MachineService = exports.MachineService = class MachineService {
    constructor(repo, machineServiceEvent) {
        this.repo = repo;
        this.machineServiceEvent = machineServiceEvent;
    }
    async create(createDto) {
        const machine = this.repo.create(createDto);
        const createddoc = await this.repo.save(machine);
        if (!createddoc) {
            throw new common_1.NotFoundException('machine creation failed');
        }
        this.machineServiceEvent.emit('machine.create', createddoc);
        return createddoc;
    }
    findAll() {
        return this.repo.find();
    }
    async findOne(fields) {
        const entity = await this.repo.findOne({
            where: fields,
        });
        if (!entity) {
            throw new common_1.NotFoundException('machine not found');
        }
        return entity;
    }
    async update(id, updateDto) {
        const existingDoc = await this.findOne({ id: +id });
        if (!existingDoc) {
            throw new common_1.NotFoundException('machine not found');
        }
        const existingDocWithUniqueField = await this.repo.findOne({
            where: [
                { systemID: updateDto.systemID, id: (0, typeorm_2.Not)((0, typeorm_2.Equal)(id)) },
                { stationName: updateDto.stationName, id: (0, typeorm_2.Not)((0, typeorm_2.Equal)(id)) },
                { stationID: updateDto.stationID, id: (0, typeorm_2.Not)((0, typeorm_2.Equal)(id)) },
                { ip: updateDto.ip, id: (0, typeorm_2.Not)((0, typeorm_2.Equal)(id)) },
            ],
        });
        if (existingDocWithUniqueField) {
            throw new common_1.ConflictException('Another machine with the same name/ID already exists');
        }
        Object.assign(existingDoc, updateDto);
        const updatedDoc = await this.repo.save(existingDoc);
        if (!updatedDoc) {
            throw new common_1.NotFoundException('machine update failed');
        }
        this.machineServiceEvent.emit('machine.update', updatedDoc);
        return updatedDoc;
    }
    async remove(fields) {
        const found = await this.repo.findOne({
            where: fields,
        });
        if (!found) {
            throw new common_1.NotFoundException('machine not found');
        }
        const deletedDoc = await this.repo.softRemove(found);
        if (!deletedDoc) {
            throw new common_1.NotFoundException('machine delete failed');
        }
        this.machineServiceEvent.emit('machine.delete', deletedDoc);
    }
};
exports.MachineService = MachineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(machine_entity_1.Machine)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], MachineService);
//# sourceMappingURL=machine.service.js.map