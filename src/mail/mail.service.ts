import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
 
@Injectable()
export default class MailService {
  private nodemailerTransport: Mail;
  private myOAuth2Client = new OAuth2Client(
    this.configService.get('GOOGLE_MAILER_CLIENT_ID'),
    this.configService.get('GOOGLE_MAILER_CLIENT_SECRET'),
    this.configService.get('GOOGLE_MAILER_REDIRECT')
  )

  constructor(
    private readonly configService: ConfigService
  ) {

    this.myOAuth2Client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_MAILER_REFRESH_TOKEN')
    })

  }
 
  async sendMail(options: Mail.Options) {
    const myAccessTokenObject = await this.myOAuth2Client.getAccessToken()


    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        type: 'OAuth2',
        user: this.configService.get('ADMIN_EMAIL_ADDRESS'),
        clientId: this.configService.get('GOOGLE_MAILER_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_MAILER_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_MAILER_REFRESH_TOKEN'),
        accessToken: myAccessTokenObject.token
      }
    });

    console.log('send mail done!')

    return this.nodemailerTransport.sendMail(options);
  }

  // async register () {

  // }
}