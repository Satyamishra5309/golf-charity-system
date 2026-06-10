// routes/subscriptionRoutes.js

import express from "express";

import {
  protect,
} from "../middlware/authMiddleware.js";

import {
  buySubscription,
  cancelSubscription,
} from "../controllers/subscriptionController.js";

const router =
  express.Router();

router.post(
  "/buy",
  protect,
  buySubscription
);

router.put(
  "/cancel",
  protect,
  cancelSubscription
);

export default router;