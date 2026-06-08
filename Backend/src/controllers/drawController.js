import Draw from "../models/Draw.js";
import User from "../models/User.js";

import Score from "../models/Score.js";
import Ticket from "../models/Ticket.js";
import Winner from "../models/Winner.js";

import {
generateRandomNumbers,
generateWeightedNumbers,
calculateMatches,
} from "../services/drawEngine.js";

// RUN DRAW
export const runDraw = async (
req,
res
) => {

try {


const {
  mode,
  simulation,
} = req.body;

const currentMonth =
  new Date().toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );

// MONTHLY CHECK
const existingDraw =
  await Draw.findOne({
    drawMonth: currentMonth,
    status: "published",
  });

if (
  existingDraw &&
  !simulation
) {

  return res.status(400).json({
    message:
      "Draw already published this month",
  });

}

// DRAW NUMBERS
let drawNumbers = [];

if (
  mode === "algorithmic"
) {

  drawNumbers =
    await generateWeightedNumbers();

} else {

  drawNumbers =
    generateRandomNumbers();

}

// ACTIVE SUBSCRIBERS
const activeSubscribers =
  await User.countDocuments({
    role: "user",
  });

// SUBSCRIPTION AMOUNT
const subscriptionAmount =
  1000;

// TOTAL POOL
const totalPrizePool =
  activeSubscribers *
  subscriptionAmount;

// ROLLOVER
let rolloverAmount = 0;

const previousDraw =
  await Draw.findOne()
    .sort({
      createdAt: -1,
    });

if (
  previousDraw &&
  previousDraw.winners.length === 0
) {

  rolloverAmount =
    previousDraw.jackpotRollover;

}

// POOL DISTRIBUTION
const fiveMatchPool =
  totalPrizePool * 0.4 +
  rolloverAmount;

const fourMatchPool =
  totalPrizePool * 0.35;

const threeMatchPool =
  totalPrizePool * 0.25;


// TICKETS
const tickets =
  await Ticket.find()
    .populate("user");

const fiveMatchWinners = [];

const fourMatchWinners = [];

const threeMatchWinners = [];

// CHECK TICKET MATCHES
for (const ticket of tickets) {

  const matchedCount =
    calculateMatches(
      ticket.numbers,
      drawNumbers
    );

  if (matchedCount === 5) {

    fiveMatchWinners.push(
      ticket.user
    );

  } else if (
    matchedCount === 4
  ) {

    fourMatchWinners.push(
      ticket.user
    );

  } else if (
    matchedCount === 3
  ) {

    threeMatchWinners.push(
      ticket.user
    );

  }

}


const winners = [];

// 5 MATCH SPLIT
const fiveMatchPrize =
  fiveMatchWinners.length > 0
    ? fiveMatchPool /
      fiveMatchWinners.length
    : 0;

for (const user of fiveMatchWinners) {

  const winner =
    await Winner.create({

      user: user._id,

      matchedCount: 5,

      prizeAmount:
        fiveMatchPrize,

      verificationStatus:
        "pending",

    });

  winners.push(
    winner._id
  );

}

// 4 MATCH SPLIT
const fourMatchPrize =
  fourMatchWinners.length > 0
    ? fourMatchPool /
      fourMatchWinners.length
    : 0;

for (const user of fourMatchWinners) {

  const winner =
    await Winner.create({

      user: user._id,

      matchedCount: 4,

      prizeAmount:
        fourMatchPrize,

      verificationStatus:
        "pending",

    });

  winners.push(
    winner._id
  );

}

// 3 MATCH SPLIT
const threeMatchPrize =
  threeMatchWinners.length > 0
    ? threeMatchPool /
      threeMatchWinners.length
    : 0;

for (const user of threeMatchWinners) {

  const winner =
    await Winner.create({

      user: user._id,

      matchedCount: 3,

      prizeAmount:
        threeMatchPrize,

      verificationStatus:
        "pending",

    });

  winners.push(
    winner._id
  );

}

// JACKPOT CARRY FORWARD
const jackpotCarryForward =
  fiveMatchWinners.length === 0
    ? fiveMatchPool
    : 0;

// CREATE DRAW
const draw =
  await Draw.create({

    drawMonth:
      currentMonth,

    drawNumbers,

    drawType:
      mode || "random",

    isSimulation:
      simulation,

    status: simulation
      ? "simulation"
      : "draft",

    jackpotRollover:
      jackpotCarryForward,

    totalPrizePool,

    winners,

    createdBy:
      req.user._id,

  });

res.json(draw);


} catch (error) {

 
res.status(500).json({
  message:
    error.message,
});


}

};


// PUBLISH DRAW
export const publishDraw =
async (req, res) => {


try {

  const draw =
    await Draw.findById(
      req.params.id
    );

  if (!draw) {

    return res.status(404).json({
      message:
        "Draw not found",
    });

  }

  draw.status =
    "published";

  draw.isSimulation =
    false;

  draw.publishedAt =
    new Date();

  await draw.save();

  res.json({
    message:
      "Draw published successfully",
  });

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// GET ALL DRAWS
export const getDraws =
async (req, res) => {


try {

  const draws =
    await Draw.find()
      .populate({
        path: "winners",
        populate: {
          path: "user",
          select:
            "name email",
        },
      })
      .sort({
        createdAt: -1,
      });

  res.json(draws);

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};
