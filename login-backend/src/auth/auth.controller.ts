import { Controller, Post, Body, UnauthorizedException, BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../Login/Login.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @Post('signup')
    async signup(@Body() body: { email: string; password: string; username: string }) {
        const existingUser = await this.userService.findByEmail(body.email);
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }
        const user = await this.userService.createUser(body.email, body.password, body.username);
        return { message: 'User registered successfully', userId: user.id };
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        this.logger.log(`User validated successfully`);
        return this.authService.login(user);
    }

    @Post('verify')
    @UseGuards(JwtAuthGuard)  // Protect this route with the JwtAuthGuard
    async verify(@Body() body: { token: string }) {
        // If this route is reached, the token is valid
        return { message: 'Token is valid' };
    }
}
