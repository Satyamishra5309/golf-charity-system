import express from "express";

import {
addScore,
getUserScores,
} from "../controllers/scoreController.js";

import {protect} from "../middlware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addScore);
router.get("/", protect, getUserScores);

export default router;
