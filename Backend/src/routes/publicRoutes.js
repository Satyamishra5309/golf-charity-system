
import express from "express";

import {
  getHomeStats,
} from "../controllers/publicController.js";

const router =
  express.Router();

router.get(
  "/stats",
  getHomeStats
);

export default router;