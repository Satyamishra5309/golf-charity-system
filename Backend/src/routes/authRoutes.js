import express from "express";

import {
registerUser,
loginUser,
getUserProfile
} from "../controllers/authController.js";
import protect from "../middlware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
