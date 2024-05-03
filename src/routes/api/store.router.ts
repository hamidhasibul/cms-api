import { Router } from "express";
import { createStore, getStore } from "../../controllers/api/store.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";

const router: Router = Router();

router.route("/").post(verifyJWT, createStore);
router.route("/:storeId").get(getStore);

export default router;
