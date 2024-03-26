import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from 'src/users/users.service';
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
export declare class AuthService {
    private jwtService;
    private usersService;
    private forgotService;
    private mailService;
    constructor(jwtService: JwtService, usersService: UsersService, forgotService: ForgotService, mailService: MailService);
    validateLogin(loginDto: AuthEmailLoginDto, onlyAdmin: boolean): Promise<LoginResponseType>;
    register(dto: AuthRegisterLoginDto): Promise<void>;
    confirmEmail(hash: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(hash: string, password: string): Promise<void>;
    me(user: User): Promise<NullableType<User>>;
    update(user: User, userDto: AuthUpdateDto): Promise<NullableType<User>>;
    softDelete(user: User): Promise<void>;
}
