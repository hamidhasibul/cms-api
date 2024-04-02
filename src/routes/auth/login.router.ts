import { loginUser } from "../../controllers/auth/login.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/").post(loginUser);

export default router;
