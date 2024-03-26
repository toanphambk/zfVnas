import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from '../../utils/types/auth/jwt-payload.type';
import { OrNeverType } from '../../utils/types/or-never.type';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    validate(payload: JwtPayloadType): OrNeverType<JwtPayloadType>;
}
export {};
