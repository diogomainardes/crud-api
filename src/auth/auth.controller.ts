import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPostData, ResendPostData } from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginPostData): any {
    return this.authService.doLogin(
      body.document.replace(/[.-]/gi, '').trim(),
      body.password,
    );
  }

  @Post('resend')
  @HttpCode(200)
  resend(@Body() body: ResendPostData): any {
    return this.authService.resend(body);
  }
}
