import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken as string;
  } else if (req.headers?.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  } else if (req.headers?.Authorization) {
    token = (req.headers.Authorization as string).replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).json({ status: "error", message: "unauthorized" });
  }

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
