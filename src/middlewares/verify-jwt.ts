import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ status: "error", message: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, decoded) => {
      if (error) {
        return res.status(403).json({ status: "error", message: "forbidden" });
      }
      req.user = (decoded as JwtPayload)?.userID;
      req.roles = (decoded as JwtPayload)?.userRole;
      next();
    }
  );
};
