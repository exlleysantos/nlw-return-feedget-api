import express, { Request, Response } from "express";

import { NodemailerMailAdapter } from "./adapters/nodemailer/NodemailerMailAdapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { SubmitFeedbackService } from "./services/submitFeedbackService";

export const routes = express.Router();

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const mailAdapter = new NodemailerMailAdapter();

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    mailAdapter
  );

  await submitFeedbackService.execute({ type, comment, screenshot });

  res.status(201).send();
});
