import express from "express";

import {

getUsers,
updateUser,

getScores,
updateScore,

deleteCharity,
updateCharity,

completePayout,

getAnalytics,

} from "../controllers/adminController.js";

import {
protect,
adminOnly,
} from "../middlware/authMiddleware.js";

const router = express.Router();

// USERS
router.get(
"/users",
protect,
adminOnly,
getUsers
);

router.put(
"/users/:id",
protect,
adminOnly,
updateUser
);

// SCORES
router.get(
"/scores",
protect,
adminOnly,
getScores
);

router.put(
"/scores/:id",
protect,
adminOnly,
updateScore
);

// CHARITIES
router.put(
"/charities/:id",
protect,
adminOnly,
updateCharity
);

router.delete(
"/charities/:id",
protect,
adminOnly,
deleteCharity
);

// WINNERS
router.put(
"/winners/:id",
protect,
adminOnly,
completePayout
);

// ANALYTICS
router.get(
"/analytics",
protect,
adminOnly,
getAnalytics
);

export default router;
