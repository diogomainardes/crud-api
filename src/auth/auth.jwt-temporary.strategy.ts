import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtTemporaryStrategy extends PassportStrategy(
  Strategy,
  'jwt-temporary',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123',
    });
  }

  async validate(payload: any) {
    if (payload.recovery) {
      return {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        recovery: payload.recovery ?? false,
      };
    }
    throw new UnauthorizedException();
  }
}
