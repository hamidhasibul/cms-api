import { Request, Response } from "express";
import { db } from "../../utils/db";

export const getBillboard = async (req: Request, res: Response) => {
  try {
    const { billboardId } = req.params;
    const billboard = await db.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    res.status(200).json({ success: true, billboard });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
