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
      select: {
        name: true,
        id: true,
      },
    });

    res.status(200).json({
      success: true,
      message: `store ${createdStore.name} has been created`,
      createdStore,
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

    res.status(200).json({ success: true, storeId, store });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/* export const getUserStores = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const stores = await db.store.findMany({
      where: {
        userId,
      },
    });

    if (!stores) {
      return res
        .status(404)
        .json({ success: false, message: "No store found" });
    }

    res.status(200).json({ success: true, stores });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
 */

export const updateStore = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const { name } = req.body;
    const { storeId } = req.params;

    console.log(userId);

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!storeId) {
      return res
        .status(400)
        .json({ success: false, message: "Store ID is required" });
    }

    await db.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });
    res.status(200).json({ success: true, message: "Store Updated" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const userId = req.user;

    const { storeId } = req.params;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });
    }

    if (!storeId) {
      return res
        .status(400)
        .json({ success: false, message: "Store ID is required" });
    }

    await db.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });
    res.status(200).json({ success: true, message: "Store deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
