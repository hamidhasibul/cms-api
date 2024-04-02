import { handleRefreshToken } from "../../controllers/auth/refresh-token.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").get(handleRefreshToken);

export default router;
