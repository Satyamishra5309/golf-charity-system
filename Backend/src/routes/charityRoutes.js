import express from "express";

import {
addCharity,
getCharities,
selectCharity,
} from "../controllers/charityController.js";

import protect from "../middlware/authMiddleware.js";
import admin from "../middlware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCharities);
router.post("/", protect, admin, addCharity);
router.put("/select", protect, selectCharity);

export default router;
