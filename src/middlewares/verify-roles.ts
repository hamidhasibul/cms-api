import { NextFunction, Request, Response } from "express";

export const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArr = [...allowedRoles];

    const result = req.roles
      .map((role) => {
        return rolesArr.includes(role);
      })
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};
