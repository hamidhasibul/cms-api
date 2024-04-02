import { NextFunction, Request, Response } from "express";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { promises as fsPromises } from "fs";
import * as path from "path";

export const logEvents = async (
  message: string,
  logName: string
): Promise<void> => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, logName), logItem);
  } catch (err: any) {
    console.log(err);
  }
};

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "requestLog.txt"
  );
  console.log(`${req.method} ${req.url}`);
  next();
};
