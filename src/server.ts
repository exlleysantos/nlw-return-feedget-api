import express, { Request, Response } from "express";

const server = express();

server.use(express.json());
server.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hi" });
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
