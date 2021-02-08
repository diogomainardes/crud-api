import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import {
  SENDGRID_API_KEY,
  SENDGRID_USERNAME,
  SENDGRID_SERVER,
} from 'src/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${SENDGRID_USERNAME}:${SENDGRID_API_KEY}@${SENDGRID_SERVER}`,
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
