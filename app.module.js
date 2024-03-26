"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const files_module_1 = require("./files/files.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_1 = require("./config/database.config");
const auth_config_1 = require("./config/auth.config");
const app_config_1 = require("./config/app.config");
const mail_config_1 = require("./config/mail.config");
const file_config_1 = require("./config/file.config");
const path = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const i18n_module_1 = require("nestjs-i18n/dist/i18n.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const mail_config_service_1 = require("./mail/mail-config.service");
const forgot_module_1 = require("./forgot/forgot.module");
const mail_module_1 = require("./mail/mail.module");
const home_module_1 = require("./home/home.module");
const typeorm_2 = require("typeorm");
const machine_module_1 = require("./machine/machine.module");
const shift_module_1 = require("./shift/shift.module");
const plc_communication_module_1 = require("./plc-communication/plc-communication.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const mes_module_1 = require("./mes/mes.module");
const monitor_module_1 = require("./monitor/monitor.module");
const machine_events_module_1 = require("./machine-events/machine-events.module");
const hardware_action_module_1 = require("./qr-code/hardware-action.module");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, auth_config_1.default, app_config_1.default, mail_config_1.default, file_config_1.default],
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                dataSourceFactory: async (options) => {
                    return new typeorm_2.DataSource(options).initialize();
                },
            }),
            mailer_1.MailerModule.forRootAsync({
                useClass: mail_config_service_1.MailConfigService,
            }),
            i18n_module_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
                        infer: true,
                    }),
                    loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.HeaderResolver,
                        useFactory: (configService) => {
                            return [configService.get('app.headerLanguage')];
                        },
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            files_module_1.FilesModule,
            auth_module_1.AuthModule,
            forgot_module_1.ForgotModule,
            mail_module_1.MailModule,
            home_module_1.HomeModule,
            machine_module_1.MachineModule,
            shift_module_1.ShiftModule,
            plc_communication_module_1.PlcCommunicationModule,
            hardware_action_module_1.HardwareActionModule,
            mes_module_1.MesModule,
            monitor_module_1.MonitorModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, 'static'),
            }),
            machine_events_module_1.MachineEventsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map