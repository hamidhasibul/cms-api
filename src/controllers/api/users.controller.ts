import { Request, Response } from "express";
import { db } from "../../utils/db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    return res.json({ status: "success", message: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error" });
  }
};
