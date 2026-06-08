
import express from "express";

import {
  createTicket,
  getMyTickets,
} from "../controllers/ticketController.js";

import {protect} from "../middlware/authMiddleware.js";
import subscriptionRequired
from "../middlware/subscriptionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  subscriptionRequired,
  createTicket
);

router.get(
  "/my",
  protect,
  getMyTickets
);

export default router;

