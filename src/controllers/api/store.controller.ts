import { Request, Response } from "express";
import { db } from "../../utils/db";

export const createStore = async (req: Request, res: Response) => {
  try {
    const userID = req.user;
    const { name }: { name: string } = req.body;

    if (!userID) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const createdStore = await db.store.create({
      data: {
        name,
        user: {
          connect: {
            id: userID,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: `store ${createdStore.name} has been created`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error` });
  }
};

export const getStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;

    const store = await db.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found!" });
    }

    res.status(200).json({ success: true, storeId });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
