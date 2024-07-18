import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { IjwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_PRIVATE_KEY,
        });
    }

    async validate(payload: IjwtPayload) {
        const user = await this.authService.isAuthorizedUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
