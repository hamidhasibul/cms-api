import { Router } from "express";
import { registerUser } from "../../controllers/auth/register.controller";

const router: Router = Router();

router.route("/").post(registerUser);

export default router;
