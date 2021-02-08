import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BASE_URL } from 'src/config';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  resetPassword = async (to: string, token: string): Promise<any> => {
    return this.mailerService.sendMail({
      to,
      from: 'ti@associacaovillageipanema.com.br',
      subject: 'Recuperação de senha', // Subject line
      text: `Sua acesse o endereço para reset da sua senha ${BASE_URL}/pass?token=${token}`,
      html: `<b>${BASE_URL}/pass?token=${token}</b>`,
    });
  };
}
