import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './auth.jwt.strategy';
import { LocalStrategy } from './auth.local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    EmailService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
