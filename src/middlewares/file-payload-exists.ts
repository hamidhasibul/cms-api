import { NextFunction, Request, Response } from "express";

export const filePayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files)
    return res.status(400).json({ status: "error", message: "No file exists" });

  next();
};
