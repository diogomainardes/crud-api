import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserService } from '../user/user.service';
import { ResendPostData } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  doLogin = async (username: string, password: string): Promise<any> => {
    const user = await this.usersService.findByDocument(username);
    if (user && user.password === password) {
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

  resend = async (data: ResendPostData) => {
    const user = await this.usersService.findByDocument(data.document);
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    await this.emailService.resetPassword(user.name, user.email);

    return {
      email: user.email,
    };
  };
}
