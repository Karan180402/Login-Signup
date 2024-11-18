import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../Login/Login.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return { userId: user.id, email: user.email };
        }
        return null;
    }

    async validateUserByJwt(payload: JwtPayload) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }

    async login(user: any) {
        const payload = { userId: user.userId, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
