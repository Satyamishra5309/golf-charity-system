import User from "../models/User.js";

import Score from "../models/Score.js";

import Charity from "../models/Charity.js";

import Winner from "../models/Winner.js";

import Draw from "../models/Draw.js";

// GET ALL USERS
export const getUsers = async (
req,
res
) => {

try {


const users =
  await User.find().select(
    "-password"
  );

res.json(users);


} catch (error) {


res.status(500).json({
  message:
    error.message,
});


}

};

// UPDATE USER
export const updateUser =
async (req, res) => {


try {

  const user =
    await User.findById(
      req.params.id
    );

  if (!user) {

    return res.status(404).json({
      message:
        "User not found",
    });

  }

  user.name =
    req.body.name ||
    user.name;

  user.email =
    req.body.email ||
    user.email;

  user.subscriptionActive =
    req.body.subscriptionActive;

  await user.save();

  res.json(user);

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// GET ALL SCORES
export const getScores =
async (req, res) => {


try {

  const scores =
    await Score.find()
      .populate(
        "user",
        "name email"
      );

  res.json(scores);

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// UPDATE SCORE
export const updateScore =
async (req, res) => {


try {

  const score =
    await Score.findById(
      req.params.id
    );

  if (!score) {

    return res.status(404).json({
      message:
        "Score not found",
    });

  }

  score.score =
    req.body.score;

  await score.save();

  res.json(score);

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// DELETE CHARITY
export const deleteCharity =
async (req, res) => {


try {

  const charity =
    await Charity.findById(
      req.params.id
    );

  if (!charity) {

    return res.status(404).json({
      message:
        "Charity not found",
    });

  }

  await charity.deleteOne();

  res.json({
    message:
      "Charity deleted",
  });

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// UPDATE CHARITY
export const updateCharity =
async (req, res) => {


try {

  const charity =
    await Charity.findById(
      req.params.id
    );

  if (!charity) {

    return res.status(404).json({
      message:
        "Charity not found",
    });

  }

  charity.name =
    req.body.name ||
    charity.name;

  charity.description =
    req.body.description ||
    charity.description;

  charity.image =
    req.body.image ||
    charity.image;

  charity.website =
    req.body.website ||
    charity.website;

  await charity.save();

  res.json(charity);

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// MARK PAYOUT COMPLETE
export const completePayout =
async (req, res) => {


try {

  const winner =
    await Winner.findById(
      req.params.id
    );

  if (!winner) {

    return res.status(404).json({
      message:
        "Winner not found",
    });

  }

  winner.paymentStatus =
    "completed";

  await winner.save();

  res.json({
    message:
      "Payout completed",
  });

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};

// ANALYTICS
export const getAnalytics =
async (req, res) => {


try {

  const totalUsers =
    await User.countDocuments();

  const totalPrizePool =
    await Draw.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum:
              "$totalPrizePool",
          },
        },
      },
    ]);

  const totalDraws =
    await Draw.countDocuments();

  const totalSimulations =
    await Draw.countDocuments({
      status:
        "simulation",
    });

  const totalPublished =
    await Draw.countDocuments({
      status:
        "published",
    });

  const charities =
    await Charity.find();

  res.json({

    totalUsers,

    totalPrizePool:
      totalPrizePool[0]
        ?.total || 0,

    totalDraws,

    totalSimulations,

    totalPublished,

    totalCharities:
      charities.length,

  });

} catch (error) {

  res.status(500).json({
    message:
      error.message,
  });

}


};
