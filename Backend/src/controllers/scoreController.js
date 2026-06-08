import Score from "../models/Score.js";

// ADD SCORE
export const addScore = async (req, res) => {

try {


const { score, playedAt } = req.body;

// VALIDATION
if (!score || !playedAt) {
  return res.status(400).json({
    message: "Please provide score and date",
  });
}

// FIND USER SCORES
const existingScores = await Score.find({
  user: req.user._id,
}).sort({ playedAt: 1 });

// IF ALREADY 5 SCORES
if (existingScores.length >= 5) {

  // DELETE OLDEST
  await Score.findByIdAndDelete(existingScores[0]._id);

}

// CREATE NEW SCORE
const newScore = await Score.create({
  user: req.user._id,
  score,
  playedAt,
});

res.status(201).json(newScore);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};

// GET USER SCORES
export const getUserScores = async (req, res) => {

try {


const scores = await Score.find({
  user: req.user._id,
}).sort({ playedAt: -1 });

res.status(200).json(scores);

} catch (error) {

res.status(500).json({
  message: error.message,
});

}

};
