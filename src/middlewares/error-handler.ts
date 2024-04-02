import { NextFunction, Request, Response } from "express";
import { logEvents } from "./log-events";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(`${error.name} : ${error.message}`, "errorLog.txt");
  console.log(error.stack);
  res.status(500).send(error.message);
};
