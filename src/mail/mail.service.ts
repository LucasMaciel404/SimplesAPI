import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private from: string | undefined;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("MAIL_HOST"),
      port: this.configService.get<number>("MAIL_PORT"),
      secure: false,
      auth: {
        user: this.configService.get<string>("MAIL_USER"),
        pass: this.configService.get<string>("MAIL_PASS"),
      },
    });

    this.from = this.configService.get<string>("MAIL_FROM");
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    const mailOptions = {
      from: this.from,
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
