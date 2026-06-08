import Charity from "../models/Charity.js";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";
import User from "../models/User.js";

export const getAdminStats = async (
req,
res
) => {

try {


const totalUsers =
  await User.countDocuments();

const totalCharities =
  await Charity.countDocuments();

const totalDraws =
  await Draw.countDocuments();

const pendingWinners =
  await Winner.countDocuments({
    verificationStatus: "pending",
  });

const draws = await Draw.find();

const totalPrizePool =
  draws.reduce(
    (acc, draw) =>
      acc + draw.totalPrizePool,
    0
  );

res.json({
  totalUsers,
  totalCharities,
  totalDraws,
  pendingWinners,
  totalPrizePool,
});


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};
