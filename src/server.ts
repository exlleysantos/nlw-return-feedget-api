import express from "express";

import { routes } from "./routes";

const server = express();

server.use(express.json());
server.use(routes);

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
