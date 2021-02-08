import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { JwtTemporaryStrategy } from './auth.jwt-temporary.strategy';
import { JwtStrategy } from './auth.jwt.strategy';
import { LocalStrategy } from './auth.local.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '60m' },
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    JwtTemporaryStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
