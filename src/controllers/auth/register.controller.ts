import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../utils/db";
import { uploadFiles } from "../../utils/upload-files";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;

  const files: Record<string, any> = req.files!;
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Valid credentials required" });
  }

  const userExists = await db.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (userExists) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const fileNames = await uploadFiles(files);
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPwd,
        image: fileNames.image,
        role: {
          create: {
            role: "USER",
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: `user ${user.name} has been created`,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
