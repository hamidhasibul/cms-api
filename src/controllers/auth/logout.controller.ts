import { CookieOptions, Request, Response } from "express";
import { db } from "../../utils/db";

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).end(); // No content
  }

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await db.user.findUnique({
      where: { refreshToken },
    });

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    if (!foundUser) {
      res
        .clearCookie("jwt", cookieOptions)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("userId", cookieOptions);
      return res.status(204).end();
    }

    await db.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        refreshToken: "",
      },
    });

    res
      .clearCookie("jwt", cookieOptions)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("userId", cookieOptions);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error });
  }
};
