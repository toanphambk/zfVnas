import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { AllConfigType } from 'src/config/config.type';
export declare class MailConfigService implements MailerOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService<AllConfigType>);
    createMailerOptions(): MailerOptions;
}
