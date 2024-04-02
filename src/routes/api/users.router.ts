import { Router } from "express";
import { getUsers } from "../../controllers/api/users.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyRoles } from "../../middlewares/verify-roles";

const router: Router = Router();

router.route("/").get(verifyJWT, verifyRoles("USER", "ADMIN"), getUsers);

export default router;
