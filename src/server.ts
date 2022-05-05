import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

import prisma from "./prisma";

const server = express();

server.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "653bcb79f97863",
    pass: "9e2a342b7b981b",
  },
});

server.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  await transport.sendMail({
    from: "Equipe Feedget <feedget@feedget.com>",
    to: "Exlley santos <exlleyclemente@gmail.com>",
    subject: "New Feedback",
    html: [
      `<p>Seu Feedback ${type} foi enviado<p>`,
      `<p>comentário : ${comment}`,
    ].join("\n"),
  });
  res.status(202).json({ data: feedback });
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
