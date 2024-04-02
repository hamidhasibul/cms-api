import path from "path";
import { v4 as uuidv4 } from "uuid";

export const uploadFiles = async (files: Record<string, any>) => {
  const fileNames: Record<string, any> = {};

  try {
    const rootPath = process.cwd();
    const filesDir = path.resolve(rootPath, "./public/files");

    for (const key of Object.keys(files)) {
      const fileName = `${uuidv4()}_${files[key].name}`;
      const filePath = path.join(filesDir, fileName);

      await files[key].mv(filePath);

      fileNames[key] = fileName;
    }
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("File upload failed");
  }

  return fileNames;
};
