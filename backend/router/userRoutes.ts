import express from "express";
import {
  index,
  store,
  show,
  destroy,
  update,
} from "../controllers/userControllers";

const router = express.Router();

router.route("/").get(index).post(store);

router.route("/:id").get(show).delete(destroy).patch(update);
export default router;
