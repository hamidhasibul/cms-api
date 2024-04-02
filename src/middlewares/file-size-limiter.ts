import { NextFunction, Request, Response } from "express";

const MB = 1;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files: Record<string, any> = req.files!;

  const filesOverLimit: string[] = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? "are" : "is";

    const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`;

    const message =
      filesOverLimit.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

    return res.status(413).json({ status: "error", message });
  }

  next();
};
