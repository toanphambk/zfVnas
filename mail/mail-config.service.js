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
exports.MailConfigService = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let MailConfigService = exports.MailConfigService = class MailConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createMailerOptions() {
        return {
            transport: {
                host: this.configService.get('mail.host', { infer: true }),
                port: this.configService.get('mail.port', { infer: true }),
                ignoreTLS: this.configService.get('mail.ignoreTLS', { infer: true }),
                secure: this.configService.get('mail.secure', { infer: true }),
                requireTLS: this.configService.get('mail.requireTLS', { infer: true }),
                auth: {
                    user: this.configService.get('mail.user', { infer: true }),
                    pass: this.configService.get('mail.password', { infer: true }),
                },
            },
            defaults: {
                from: `"${this.configService.get('mail.defaultName', {
                    infer: true,
                })}" <${this.configService.get('mail.defaultEmail', { infer: true })}>`,
            },
            template: {
                dir: path.join(this.configService.getOrThrow('app.workingDirectory', {
                    infer: true,
                }), 'src', 'mail', 'mail-templates'),
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        };
    }
};
exports.MailConfigService = MailConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailConfigService);
//# sourceMappingURL=mail-config.service.js.map