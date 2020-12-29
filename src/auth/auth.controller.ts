import { Body, Controller, HttpCode, Options, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPostData, ResendPostData } from './auth.validation';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() body: LoginPostData): object {
        return this.authService.doLogin(body);
    }
    
    @Post('resend')
    @HttpCode(200)
    resend(@Body() body: ResendPostData): object {
        return this.authService.resend(body);
    }
}
