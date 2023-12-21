/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import cors from "cors";
import { PORT } from "./utils/constants";

const app: Express = express();

const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error.stack);
  return res.status(500).send({ error: error.message });
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
