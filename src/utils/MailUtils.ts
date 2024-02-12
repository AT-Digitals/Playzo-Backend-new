import { MailDto } from "../dto/mail/mail.dto";
import nodemailer from "nodemailer";

export default class MailUtils{

    static sendMail(request: MailDto) {
    const channel = MailUtils.createChannel();

 return channel.sendMail({
      from: "\"Booking\" <antoshoba@gmail.com>",
      to: request.to,
      subject: request.subject,
      text: request.text,
      html: request.html,
    });
  }
  static createChannel() {
    return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        }
      });
  }
}