import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { db } from "../../utils/db";

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).end();
  }

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await db.user.findUnique({
      where: {
        refreshToken,
      },
      include: { role: true },
    });

    if (!foundUser) {
      return res.status(403); // Forbidden
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (error: VerifyErrors | null, decoded: any) => {
        if (error || foundUser.id !== decoded?.userID) {
          return res.status(403);
        }

        const roles = Object.values(foundUser.role).map((role) => {
          return role.role;
        });

        const accessToken = jwt.sign(
          { userID: decoded.userID, userRole: roles },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "1d" }
        );

        res.status(200).json({ status: "success", accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
