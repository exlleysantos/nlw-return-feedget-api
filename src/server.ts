import express, { Request, Response } from "express";

import prisma from "./prisma";

const server = express();

server.use(express.json());
server.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });
  res.status(202).json({ data: feedback });
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
