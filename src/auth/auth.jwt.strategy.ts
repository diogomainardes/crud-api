import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123',
    });
  }

  async validate(payload: any) {
    if (payload.recovery) throw new UnauthorizedException();

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      recovery: payload.recovery ?? false,
    };
  }
}
