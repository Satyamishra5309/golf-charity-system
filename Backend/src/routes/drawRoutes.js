import express from "express";

import {
runDraw,
publishDraw,
getDraws,
} from "../controllers/drawController.js";

import {
protect,
adminOnly,
} from "../middlware/authMiddleware.js";

const router = express.Router();

router.get(
"/",
protect,
getDraws
);

router.post(
"/run",
protect,
adminOnly,
runDraw
);

router.put(
"/publish/:id",
protect,
adminOnly,
publishDraw
);

export default router;
