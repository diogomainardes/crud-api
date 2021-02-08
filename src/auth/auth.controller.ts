import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordPostData } from 'src/user/user.validation';
import { AuthService } from './auth.service';
import {
  CheckTokenPostData,
  LoginPostData,
  ResendPostData,
} from './auth.validation';

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
    return this.authService.resend(body.document);
  }

  @Post('check-token')
  @HttpCode(200)
  checkToken(@Body() body: CheckTokenPostData): any {
    return this.authService.checkTokenResetPassword(body.token);
  }

  @UseGuards(AuthGuard('jwt-temporary'))
  @Post('reset-password')
  async resetPassword(@Request() req, @Body() body: UpdatePasswordPostData) {
    return await this.authService.resetPassword(req.user.id, body.password);
  }
}
