import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../utils/db";

export const loginUser = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "valid credentials required" });
  }

  try {
    const foundUser = await db.user.findUnique({
      where: { phone },
      include: { role: true },
    });

    if (!foundUser) {
      return res.status(401).json({ success: false, message: "unauthorized" }); // 401 - unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const roles = Object.values(foundUser.role).map((role) => {
        return role.role;
      });

      const accessToken = jwt.sign(
        { userID: foundUser.id, userRole: roles },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { userID: foundUser.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      await db.user.update({
        where: { id: foundUser.id },
        data: { refreshToken },
      });

      const cookieOptions: CookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      };

      res
        .cookie("jwt", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions);

      res.json({
        success: true,
        message: `Welcome ${foundUser.name}!!`,
        accessToken,
      });
    } else {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
