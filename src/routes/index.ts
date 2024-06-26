import { Router } from "express";

import registerRouter from "./auth/register.router";
import loginRouter from "./auth/login.router";
import logoutRouter from "./auth/logout.router";
import refreshTokenRouter from "./auth/refresh-token.router";

import usersRouter from "./api/users.router";
import storeRouter from "./api/store.router";
import billboardRouter from "./api/billboards.router";

const router: Router = Router();

// Auth routes
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/refresh-token", refreshTokenRouter);

// API routes
router.use("/users", usersRouter);
router.use("/stores", storeRouter);
router.use("/billboards", billboardRouter);

export default router;
