import express from "express";

import {
uploadProof,
verifyWinner,
markAsPaid,
getWinners,
} from "../controllers/winnerController.js";

import {protect} from "../middlware/authMiddleware.js";
import admin from "../middlware/adminMiddleware.js";
import upload from "../middlware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getWinners);

router.put(
"/upload/:id",
protect,
upload.single("proof"),
uploadProof
);

router.put(
"/verify/:id",
protect,
admin,
verifyWinner
);

router.put(
"/paid/:id",
protect,
admin,
markAsPaid
);

export default router;
