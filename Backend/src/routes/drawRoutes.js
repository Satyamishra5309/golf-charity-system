import express from "express";

import {
runDraw,
getDraws,
publishDraw,
} from "../controllers/drawController.js";

import protect from "../middlware/authMiddleware.js";
import admin from "../middlware/adminMiddleware.js";

const router = express.Router();

router.post("/run", protect, admin, runDraw);
router.get("/", protect, getDraws);
router.put(
"/publish/:id",
protect,
admin,
publishDraw
);

export default router;
