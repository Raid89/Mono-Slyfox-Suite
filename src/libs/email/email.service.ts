import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendConfirmation(to: string, token: string) {
    try {
      const templatePath = path.join(__dirname, '../..', 'templates', 'verify-email.html');
      let html = await fs.readFile(templatePath, 'utf8');
      const url = process.env.API_URL + `/api/v1/auth/confirm?token=${token}`;
      html = html.replace('{{url}}', url);

      await this.resend.emails.send({
        from: 'SaaS Suite <gerencia.general@slyfox.com.co>',
        to,
        subject: 'Confirm your registration',
        html
      });
    } catch (error) {
      console.error(error)
      throw error;
    }

  }
}
