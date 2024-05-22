import { getBillboard } from "../../controllers/api/billboards.controller";
import { Router } from "express";

const router: Router = Router();

router.route("/:billboardId").get(getBillboard);

export default router;
