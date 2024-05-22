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

export const getUserStore = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const store = await db.store.findFirst({
      where: { userId },
    });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found" });
    }

    res.status(200).json({ success: true, store });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
