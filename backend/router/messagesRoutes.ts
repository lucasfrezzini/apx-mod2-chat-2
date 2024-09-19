import express from "express";
import { index } from "../controllers/messagesController";

const router = express.Router();

router.route("/messages").post(index);
export default router;
