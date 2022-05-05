import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "653bcb79f97863",
    pass: "9e2a342b7b981b",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <feedget@feedget.com>",
      to: "Exlley santos <exlleyclemente@gmail.com>",
      subject,
      html: body,
    });
  }
}
