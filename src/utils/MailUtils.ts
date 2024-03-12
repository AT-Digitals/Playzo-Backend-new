import { MailDto } from "../dto/mail/mail.dto";
import nodemailer from "nodemailer";

export default class MailUtils{

    static sendMail(request: MailDto) {
    const channel = MailUtils.createChannel();

 return channel.sendMail({
      from: "<antoshoba@gmail.com>",
      to: request.to,
      subject: request.subject,
      text: request.text,
      html: request.html,
    });
  }
  static createChannel() {
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT?parseInt(process.env.MAIL_PORT):2525,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        }
      });
  }
}