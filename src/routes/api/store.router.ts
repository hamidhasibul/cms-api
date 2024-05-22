import { Router } from "express";
import {
  createStore,
  deleteStore,
  getStore,
  updateStore,
} from "../../controllers/api/store.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";

const router: Router = Router();

router.route("/").post(verifyJWT, createStore);
router
  .route("/:storeId")
  .get(getStore)
  .patch(verifyJWT, updateStore)
  .delete(verifyJWT, deleteStore);

export default router;
