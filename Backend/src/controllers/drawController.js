import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import User from "../models/User.js";

// GENERATE RANDOM DRAW NUMBERS
const generateDrawNumbers = () => {

const numbers = [];

while (numbers.length < 5) {


const random = Math.floor(Math.random() * 45) + 1;

if (!numbers.includes(random)) {
  numbers.push(random);
}


}

return numbers;
};

// COUNT MATCHES
const countMatches = (userScores, drawNumbers) => {

return userScores.filter(score =>
drawNumbers.includes(score)
).length;

};

// RUN DRAW
export const runDraw = async (req, res) => {

try {


const drawNumbers = generateDrawNumbers();

const users = await User.find();

const winners = [];

let totalPrizePool = users.length * 100;

// LOOP USERS
for (const user of users) {

  const scores = await Score.find({
    user: user._id,
  });

  const userNumbers = scores.map(s => s.score);

  const matchedCount = countMatches(
    userNumbers,
    drawNumbers
  );

  // WINNER CONDITIONS
  if (
    matchedCount === 3 ||
    matchedCount === 4 ||
    matchedCount === 5
  ) {

    winners.push({
      user: user._id,
      matchedCount,
      prizeAmount: 0,
    });

  }

}

// SPLIT WINNERS
const fiveMatch = winners.filter(w => w.matchedCount === 5);

const fourMatch = winners.filter(w => w.matchedCount === 4);

const threeMatch = winners.filter(w => w.matchedCount === 3);


// CALCULATE PRIZES
const fivePool = totalPrizePool * 0.40;

const fourPool = totalPrizePool * 0.35;

const threePool = totalPrizePool * 0.25;


// DISTRIBUTE
fiveMatch.forEach(w => {
  w.prizeAmount =
    fiveMatch.length > 0
      ? fivePool / fiveMatch.length
      : 0;
});

fourMatch.forEach(w => {
  w.prizeAmount =
    fourPool / fourMatch.length;
});

threeMatch.forEach(w => {
  w.prizeAmount =
    threePool / threeMatch.length;
});


// CREATE DRAW
const draw = await Draw.create({
  drawNumbers,
  drawMonth: new Date().toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  ),
  totalPrizePool,
  winners,
  status: "simulation",
});

res.status(201).json(draw);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};

// GET ALL DRAWS
export const getDraws = async (req, res) => {

try {


const draws = await Draw.find()
  .populate("winners.user", "name email")
  .sort({ createdAt: -1 });

res.status(200).json(draws);

} catch (error) {

res.status(500).json({
  message: error.message,
});

}

};

// PUBLISH DRAW
export const publishDraw = async (req, res) => {

try {

const draw = await Draw.findById(req.params.id);

if (!draw) {
  return res.status(404).json({
    message: "Draw not found",
  });
}

draw.status = "published";

await draw.save();

res.status(200).json(draw);

} catch (error) {

res.status(500).json({
  message: error.message,
});

}

};
