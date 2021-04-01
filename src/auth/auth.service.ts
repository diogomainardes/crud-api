import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { addMinutes } from 'date-fns';
import * as md5 from 'md5';
import { SALT_HASH } from 'src/config';
import { EmailService } from 'src/email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  doLogin = async (username: string, password: string): Promise<any> => {
    const user = await this.usersService.findByDocument(username);
    if (user && user.password === md5(await hash(password, SALT_HASH))) {
      const role = user.is_admin ? 'admin' : 'user';
      return {
        token: this.jwtService.sign({
          sub: user.id,
          name: user.name,
          role,
          email: user.email,
        }),
      };
    }

    throw new UnauthorizedException('Login/Senha inválidos');
  };

  resend = async (document: string) => {
    const user = await this.usersService.findByDocument(document);
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    const newToken = md5(
      await hash(user.email + user.id.toString() + new Date().toString(), 5),
    );
    user.password_reset_token = newToken;
    user.password_reset_token_expire = addMinutes(new Date(), 15);
    await user.save();

    await this.emailService.resetPassword(user.email, newToken);

    return {
      email: user.email,
    };
  };

  checkTokenResetPassword = async (token: string) => {
    const user = await this.usersService.findByResetToken(token);
    if (!user)
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);

    user.password_reset_token = null;
    user.password_reset_token_expire = null;
    await user.save();

    return {
      token: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          role: user.is_admin ? 'admin' : 'user',
          email: user.email,
          recovery: true,
        },
        {
          expiresIn: '1m',
        },
      ),
    };
  };

  resetPassword = async (id: number, newPass: string) => {
    const user = await this.usersService.updatePassword(id, newPass);
    return await this.doLogin(user.document, newPass);
  };
}
