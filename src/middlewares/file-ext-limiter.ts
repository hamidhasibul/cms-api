import { NextFunction, Request, Response } from "express";
import path from "path";

export const fileExtLimiter = (allowedExtArray: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: Record<string, any> = req.files!;

    const fileExtentions: string[] = [];

    Object.keys(files).forEach((key) => {
      fileExtentions.push(path.extname(files[key].name));
    });

    const allowed = fileExtentions.every((ext) => {
      return allowedExtArray.includes(ext);
    });

    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`;
      return res.status(422).json({ status: "error", message });
    }

    next();
  };
};
