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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const role_entity_1 = require("../../roles/entities/role.entity");
const status_entity_1 = require("../../statuses/entities/status.entity");
const file_entity_1 = require("../../files/entities/file.entity");
const bcrypt = require("bcryptjs");
const entity_helper_1 = require("../../utils/entity-helper");
const auth_providers_enum_1 = require("../../auth/auth-providers.enum");
let User = exports.User = class User extends entity_helper_1.EntityHelper {
    loadPreviousPassword() {
        this.previousPassword = this.password;
    }
    async setPassword() {
        if (this.previousPassword !== this.password && this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'The unique identifier of the user' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'Email of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "previousPassword", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "loadPreviousPassword", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ default: auth_providers_enum_1.AuthProvidersEnum.email }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    (0, swagger_1.ApiProperty)({
        example: auth_providers_enum_1.AuthProvidersEnum.email,
        description: 'Authentication provider of the user',
    }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    (0, swagger_1.ApiProperty)({
        example: '1234567890',
        description: 'Social ID of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "socialId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'First name of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'Last name of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.FileEntity, { eager: true }),
    (0, swagger_1.ApiProperty)({
        type: () => file_entity_1.FileEntity,
        description: 'Photo file of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, { eager: true }),
    (0, swagger_1.ApiProperty)({
        type: () => role_entity_1.Role,
        description: 'Role of the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.Status, { eager: true }),
    (0, swagger_1.ApiProperty)({
        type: () => status_entity_1.Status,
        description: 'Status of the user',
        nullable: true,
    }),
    __metadata("design:type", status_entity_1.Status)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, swagger_1.ApiProperty)({
        example: 'someHash',
        description: 'Unique hash for the user',
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2021-01-01T00:00:00.000Z',
        description: 'Creation date of the user record',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2022-01-01T00:00:00.000Z',
        description: 'Last update date of the user record',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        example: '2022-01-01T00:00:00.000Z',
        description: 'Deletion date of the user record',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map