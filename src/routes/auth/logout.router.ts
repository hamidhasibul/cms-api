import { handleLogout } from "../../controllers/auth/logout.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").get(handleLogout);

export default router;
