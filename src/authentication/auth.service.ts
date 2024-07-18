import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IjwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    //Interceptador que valida todas as requests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async isAuthorizedUser(token: IjwtPayload): Promise<any> {
        try {
            console.log('my-token', token);
            return true;
        } catch (e) {
            return null;
        }
    }

    async decode(token: string): Promise<IjwtPayload> {
        try {
            return this.jwtService.decode(token);
        } catch (e) {
            return null;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validateUserRole(token: string): Promise<boolean> {
        try {
            console.log('userRole=>', token);
            return true;
        } catch (e) {
            return null;
        }
    }
}
